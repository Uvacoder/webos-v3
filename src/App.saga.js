// /*
//  * @Author: Chandu J S
//  * @Date:   2020-10-29 18:10:41
//  * @Last Modified by:   Chandu J S
//  * @Last Modified time: 2020-12-28 23:16:38
//  */
// import { call, put, takeLatest } from "redux-saga/effects";
// import * as BoardsAPI from "../../api/boards.service";
// import * as TransactionsAPI from "../../api/transactions.service";

// export const Actions = {
// 	saveCard: "pricing/save-card/",
// 	fetchInvoices: "pricing/fetch-invoices/",
// 	startBoardTrial: "pricing/start-board-trial/",
// 	fetchCustomerCard: "pricing/fetch-customer-card/",
// 	updateBillingMethod: "pricing/update-billing-method/",
// 	processBoardUpgrade: "pricing/process-board-upgrade/",
// 	fetchProductPricing: "pricing/fetch-product-pricing/",
// 	updateCustomerDetails: "pricing/update-customer-details/",
// 	upgradeBoardToPremium: "pricing/upgrade-board-to-premium/",
// 	createBoardSubscription: "pricing/create-board-subscription/",
// 	fetchBoardSubscriptions: "pricing/fetch-board-subscriptions/",
// 	subscriptionCancellation: "pricing/subscription-cancellation/"
// };

// function* processBoardUpgradeSaga() {
// 	const base = Actions.processBoardUpgrade;

// 	yield takeLatest(base + "request", function*(action) {
// 		try {
// 			const {
// 				boardId,
// 				customerId,
// 				stripeToken,
// 				trialPeriod,
// 				b2bCustomer,
// 				planInterval,
// 				premiumBoard,
// 				licsPurchased
// 			} = action.payload;

// 			yield put({ type: base + "pending" });

// 			const subscriptionApiResponse = yield call(
// 				async () =>
// 					await TransactionsAPI.createSubscription(
// 						boardId,
// 						stripeToken,
// 						customerId,
// 						b2bCustomer,
// 						licsPurchased,
// 						planInterval
// 					)
// 			);

// 			if (
// 				subscriptionApiResponse &&
// 				subscriptionApiResponse.message &&
// 				subscriptionApiResponse.message === "success" &&
// 				subscriptionApiResponse.data &&
// 				subscriptionApiResponse.data.subscriptionId
// 			) {
// 				if (trialPeriod || !premiumBoard) {
// 					const upgradeApiResponse = yield call(
// 						async () =>
// 							await BoardsAPI.upgradeBoard(
// 								boardId,
// 								planInterval,
// 								// planChanged,
// 								b2bCustomer
// 							)
// 					);

// 					if (upgradeApiResponse) {
// 						yield put({
// 							type: base + "fulfilled",
// 							payload: {
// 								upgraded: true,
// 								...upgradeApiResponse
// 							}
// 						});
// 					} else {
// 						throw new Error(upgradeApiResponse);
// 					}
// 				} else {
// 					yield put({
// 						type: base + "fulfilled",
// 						payload: {
// 							licenseAdded: true,
// 							...subscriptionApiResponse
// 						}
// 					});
// 				}
// 			} else {
// 				throw new Error(subscriptionApiResponse);
// 			}
// 		} catch (e) {
// 			yield put({
// 				type: base + "rejected",
// 				payload: {
// 					...e,
// 					premiumBoard: action.payload.premiumBoard
// 						? "addLicenses"
// 						: "upgrade"
// 				}
// 			});
// 		}
// 	});
// }

// function* fetchProductPricingSaga() {
// 	const base = Actions.fetchProductPricing;

// 	yield takeLatest(base + "request", function*(action) {
// 		try {
// 			const { boardId } = action.payload;

// 			yield put({ type: base + "pending" });

// 			const apiResponse = yield call(
// 				async () => await TransactionsAPI.getProductPricing(boardId)
// 			);

// 			if (
// 				apiResponse &&
// 				apiResponse.message &&
// 				apiResponse.message === "success"
// 			) {
// 				yield put({
// 					type: base + "fulfilled",
// 					payload: apiResponse
// 				});
// 			} else {
// 				throw new Error(apiResponse);
// 			}
// 		} catch (e) {
// 			yield put({
// 				type: base + "rejected",
// 				payload: e
// 			});
// 		}
// 	});
// }

// function* fetchCustomerCardSaga() {
// 	const base = Actions.fetchCustomerCard;

// 	yield takeLatest(base + "request", function*(action) {
// 		try {
// 			const { boardId } = action.payload;

// 			yield put({ type: base + "pending" });

// 			const apiResponse = yield call(
// 				async () => await TransactionsAPI.getCustomerCard(boardId)
// 			);

// 			if (apiResponse) {
// 				yield put({
// 					type: base + "fulfilled",
// 					payload: apiResponse
// 				});
// 			} else {
// 				throw new Error(apiResponse);
// 			}
// 		} catch (e) {
// 			yield put({
// 				type: base + "rejected",
// 				payload: e
// 			});
// 		}
// 	});
// }

// function* saveCardSaga() {
// 	const base = Actions.saveCard;

// 	yield takeLatest(base + "request", function*(action) {
// 		try {
// 			const { boardId, stripeToken } = action.payload;

// 			yield put({ type: base + "pending" });

// 			const apiResponse = yield call(
// 				async () =>
// 					await TransactionsAPI.saveCustomerCard(boardId, stripeToken)
// 			);

// 			if (
// 				apiResponse &&
// 				apiResponse.message &&
// 				apiResponse.message === "success"
// 			) {
// 				yield put({
// 					type: base + "fulfilled",
// 					payload: apiResponse
// 				});
// 			} else {
// 				throw new Error(apiResponse);
// 			}
// 		} catch (e) {
// 			yield put({
// 				type: base + "rejected",
// 				payload: e
// 			});
// 		}
// 	});
// }

// function* createBoardSubscriptionSaga() {
// 	const base = Actions.createBoardSubscription;

// 	yield takeLatest(base + "request", function*(action) {
// 		try {
// 			const {
// 				boardId,
// 				stripeToken,
// 				customerId,
// 				b2bCustomer,
// 				licsPurchased,
// 				planInterval
// 			} = action.payload;

// 			yield put({ type: base + "pending" });

// 			const apiResponse = yield call(
// 				async () =>
// 					await TransactionsAPI.createSubscription(
// 						boardId,
// 						stripeToken,
// 						customerId,
// 						b2bCustomer,
// 						licsPurchased,
// 						planInterval
// 					)
// 			);

// 			if (apiResponse) {
// 				yield put({
// 					type: base + "fulfilled",
// 					payload: apiResponse
// 				});
// 			} else {
// 				throw new Error(apiResponse);
// 			}
// 		} catch (e) {
// 			yield put({
// 				type: base + "rejected",
// 				payload: e
// 			});
// 		}
// 	});
// }

// // TODO: This method is not used. Remove later
// // function* upgradeBoardToPremiumSaga() {
// // const base = Actions.upgradeBoardToPremium;

// // 	yield takeLatest(base + "request", function*(action) {
// // 		try {
// // 			const {
// // 				boardId,
// // 				planInterval,
// // 				planChanged,
// // 				b2bCustomer
// // 			} = action.payload;

// // 			yield put({ type: base + "pending" });

// // 			const apiResponse = yield call(
// // 				async () =>
// // 					await BoardsAPI.upgradeBoard(
// // 						boardId,
// // 						planInterval,
// // 						planChanged,
// // 						b2bCustomer
// // 					)
// // 			);

// // 			if (apiResponse) {
// // 				yield put({
// // 					type: base + "fulfilled",
// // 					payload: apiResponse
// // 				});
// // 			} else {
// // 				throw new Error(apiResponse);
// // 			}
// // 		} catch (e) {
// // 			yield put({
// // 				type: base + "rejected",
// // 				payload: e
// // 			});
// // 		}
// // 	});
// // }

// function* startBoardTrialSaga() {
// 	const base = Actions.startBoardTrial;

// 	yield takeLatest(base + "request", function*(action) {
// 		try {
// 			const { boardId } = action.payload;

// 			yield put({ type: base + "pending" });

// 			const apiResponse = yield call(
// 				async () => await BoardsAPI.startTrial(boardId)
// 			);

// 			if (apiResponse) {
// 				yield put({
// 					type: base + "fulfilled",
// 					payload: apiResponse
// 				});
// 			} else {
// 				throw new Error(apiResponse);
// 			}
// 		} catch (e) {
// 			yield put({
// 				type: base + "rejected",
// 				payload: e
// 			});
// 		}
// 	});
// }

// function* fetchBoardSubscriptionsSaga() {
// 	const base = Actions.fetchBoardSubscriptions;

// 	yield takeLatest(base + "request", function*(action) {
// 		try {
// 			const { boardId } = action.payload;

// 			yield put({ type: base + "pending" });

// 			const apiResponse = yield call(
// 				async () => await TransactionsAPI.getSubscriptions(boardId)
// 			);

// 			if (
// 				apiResponse &&
// 				apiResponse.message &&
// 				apiResponse.message === "success"
// 			) {
// 				yield put({
// 					type: base + "fulfilled",
// 					payload: apiResponse
// 				});
// 			} else {
// 				throw new Error(apiResponse);
// 			}
// 		} catch (e) {
// 			yield put({
// 				type: base + "rejected",
// 				payload: e
// 			});
// 		}
// 	});
// }

// function* subscriptionCancellationSaga() {
// 	const base = Actions.subscriptionCancellation;

// 	yield takeLatest(base + "request", function*(action) {
// 		try {
// 			const { boardId, subscriptionId } = action.payload;

// 			yield put({ type: base + "pending" });

// 			const apiResponse = yield call(
// 				async () =>
// 					await TransactionsAPI.cancelSubscription(
// 						boardId,
// 						subscriptionId
// 					)
// 			);

// 			if (
// 				apiResponse &&
// 				apiResponse.message &&
// 				apiResponse.message === "success" &&
// 				apiResponse.data &&
// 				apiResponse.data.status
// 			) {
// 				yield put({
// 					type: base + "fulfilled",
// 					payload: apiResponse
// 				});
// 			} else {
// 				throw new Error(apiResponse);
// 			}
// 		} catch (e) {
// 			yield put({
// 				type: base + "rejected",
// 				payload: e
// 			});
// 		}
// 	});
// }

// function* updateCustomerDetailsSaga() {
// 	const base = Actions.updateCustomerDetails;

// 	yield takeLatest(base + "request", function*(action) {
// 		try {
// 			const { boardId, adminEmail } = action.payload;

// 			yield put({ type: base + "pending" });

// 			const apiResponse = yield call(
// 				async () =>
// 					await TransactionsAPI.updateCustomer(boardId, adminEmail)
// 			);

// 			if (
// 				apiResponse &&
// 				apiResponse.message &&
// 				apiResponse.message === "success"
// 			) {
// 				yield put({
// 					type: base + "fulfilled",
// 					payload: apiResponse
// 				});
// 			} else {
// 				throw new Error(apiResponse);
// 			}
// 		} catch (e) {
// 			yield put({
// 				type: base + "rejected",
// 				payload: e
// 			});
// 		}
// 	});
// }

// function* updateBillingMethodSaga() {
// 	const base = Actions.updateBillingMethod;

// 	yield takeLatest(base + "request", function*(action) {
// 		try {
// 			const { boardId, subscriptionId, billingMethod } = action.payload;

// 			yield put({ type: base + "pending" });

// 			const apiResponse = yield call(
// 				async () =>
// 					await TransactionsAPI.updateSubscription(
// 						boardId,
// 						subscriptionId,
// 						billingMethod
// 					)
// 			);

// 			if (
// 				apiResponse &&
// 				apiResponse.message &&
// 				apiResponse.message === "success"
// 			) {
// 				yield put({
// 					type: base + "fulfilled",
// 					payload: apiResponse
// 				});
// 			} else {
// 				throw new Error(apiResponse);
// 			}
// 		} catch (e) {
// 			yield put({
// 				type: base + "rejected",
// 				payload: e
// 			});
// 		}
// 	});
// }

// function* fetchInvoicesSaga() {
// 	const base = Actions.fetchInvoices;

// 	yield takeLatest(base + "request", function*(action) {
// 		try {
// 			const { boardId, subscriptionId } = action.payload;

// 			yield put({ type: base + "pending" });

// 			const apiResponse = yield call(
// 				async () =>
// 					await TransactionsAPI.getInvoices(boardId, subscriptionId)
// 			);

// 			if (
// 				apiResponse &&
// 				apiResponse.message &&
// 				apiResponse.message === "success"
// 			) {
// 				yield put({
// 					type: base + "fulfilled",
// 					payload: apiResponse
// 				});
// 			} else {
// 				throw new Error(apiResponse);
// 			}
// 		} catch (e) {
// 			yield put({
// 				type: base + "rejected",
// 				payload: e
// 			});
// 		}
// 	});
// }

// export const upgradeBoardSagas = [
// 	processBoardUpgradeSaga(),
// 	fetchProductPricingSaga(),
// 	fetchCustomerCardSaga(),
// 	saveCardSaga(),
// 	createBoardSubscriptionSaga(),
// 	// upgradeBoardToPremiumSaga(),
// 	startBoardTrialSaga(),
// 	fetchBoardSubscriptionsSaga(),
// 	subscriptionCancellationSaga(),
// 	updateCustomerDetailsSaga(),
// 	updateBillingMethodSaga(),
// 	fetchInvoicesSaga()
// ];
