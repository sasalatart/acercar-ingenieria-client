import { Map, OrderedSet } from 'immutable';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import humps from 'humps';
import { getEntities } from '../entities';

export default function crudReducerFactory(actionTypes, initialState = new Map({})) {
  return function crudReducer(state = initialState, { type, payload, meta }) {
    switch (type) {
      case actionTypes.set: {
        const toSet = new OrderedSet(payload.result);
        return meta.baseId ? state.set(meta.baseId, toSet) : toSet;
      }
      case actionTypes.add: {
        if (!meta.baseId) return state.add(payload.result);

        return state.update(
          meta.baseId,
          ids => (ids ? ids.add(payload.result) : new OrderedSet([payload.result])),
        );
      }
      case actionTypes.remove: {
        if (!Map.isMap(state)) return state.delete(meta.id);

        const baseId = state.findKey(ids => ids.has(meta.id));
        return baseId
          ? state.update(baseId, ids => ids.delete(meta.id))
          : state;
      }
      default:
        return state;
    }
  };
}

export function crudActionsFactory(types, schema, urlOptions) {
  const collectionUrlPart = urlOptions && urlOptions.collection
    ? humps.decamelize(urlOptions.collection)
    : humps.decamelize(schema.key);

  const baseCollectionUrlPart = urlOptions
    && urlOptions.baseCollection
    && humps.decamelize(urlOptions.baseCollection);

  const suffixUrlPart = urlOptions && urlOptions.suffix
    ? `/${humps.decamelize(urlOptions.suffix)}`
    : '';

  function loadIndex({ baseId, query } = {}) {
    return {
      type: types.LOAD_INDEX,
      payload: {
        method: 'GET',
        url: baseCollectionUrlPart && baseId
          ? `/${baseCollectionUrlPart}/${baseId}/${collectionUrlPart}${suffixUrlPart}`
          : `/${collectionUrlPart}${suffixUrlPart}`,
        query,
        responseSchema: [schema],
      },
      meta: {
        baseId,
        ...query,
      },
    };
  }

  function load(id) {
    return {
      type: types.LOAD,
      payload: {
        method: 'GET',
        url: `/${collectionUrlPart}/${id}`,
        responseSchema: schema,
      },
      meta: {
        id,
      },
    };
  }

  function create(body, baseId) {
    return {
      type: types.CREATE,
      payload: {
        method: 'POST',
        url: baseCollectionUrlPart && baseId
          ? `/${baseCollectionUrlPart}/${baseId}/${collectionUrlPart}`
          : `/${collectionUrlPart}`,
        body,
        responseSchema: schema,
      },
      meta: {
        create: true,
        collection: schema.key,
        baseId,
      },
    };
  }

  function update(id, body) {
    return {
      type: types.UPDATE,
      payload: {
        method: 'PUT',
        url: `/${collectionUrlPart}/${id}`,
        body,
        responseSchema: schema,
      },
      meta: {
        update: true,
        collection: schema.key,
        id,
      },
    };
  }

  function destroy(id) {
    return {
      type: types.DESTROY,
      payload: {
        method: 'DELETE',
        url: `/${collectionUrlPart}/${id}`,
      },
      meta: {
        destroy: true,
        collection: schema.key,
        id,
      },
    };
  }

  return {
    loadIndex,
    load,
    create,
    update,
    destroy,
  };
}

export function crudSelectorsFactory(dataSelector, key, schema, baseIdSelector) {
  const getIds = baseIdSelector
    ? (
      createSelector(
        dataSelector,
        baseIdSelector,
        (data, baseId) => (data[key].get(baseId) || new OrderedSet()).toJS(),
      )
    )
    : createSelector(dataSelector, data => data[key].toJS());

  const getResourceEntities = createSelector(
    getIds,
    getEntities,
    (ids, entities) => denormalize(ids, [schema], entities),
  );

  return { getResourceEntities };
}
