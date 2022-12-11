import { call, put, takeEvery } from 'redux-saga/effects';
import { addManyCustomersAction, ADD_MANY_CUSTOMERS, ASYNC_MANY_CUSTOMERS } from '../store/customerReducer';

const fetchUsers = () => fetch('https://jsonplaceholder.typicode.com/users')

function* fetchUserWorker() {
	const data = yield call(fetchUsers)
	const json = yield call(() => new Promise((res) => res(data.json())))
	yield console.log(json);
	yield put(addManyCustomersAction(json))
}

export function* userWatcher() {
	yield takeEvery(ASYNC_MANY_CUSTOMERS, fetchUserWorker)
}