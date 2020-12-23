import { takeLatest,call,put, all } from 'redux-saga/effects';
import ShopActionTypes from  './shop.types';
import  { firestore,convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess,fetchCollectionsFailure} from './shop.actions'; 
 
export function* fetchCollectionAsync(){

    try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap,snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap));
    }catch (error) {
        // we are using put for dispatching an action in redux
    yield put(fetchCollectionsFailure(error));
    }

}
export function* fetchCollectionsStart(){
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START,fetchCollectionAsync);
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)])
}