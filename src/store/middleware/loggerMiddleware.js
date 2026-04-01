/**
 * Redux Logger Middleware
 * Iska kaam har dispatch honay walay action aur state change ko console par dikhana hai.
 */
const loggerMiddleware = store => next => action => {
    // 1. Action Type aur Slice Name nikalna
    const actionType = action.type; // e.g., 'cart/addToCart'
    const sliceName = actionType.split('/')[0]; // e.g., 'cart'

    console.log('\n--- [REDUX ACTION] ---');
    console.log('TYPE:   ', actionType);
    console.log('PAYLOAD:', action.payload || 'No Payload');

    // 2. Action ko process karna
    const result = next(action);

    // 3. Action ke baad wali state dekhna
    // const nextState = store.getState();
    // const changedSliceState = nextState[sliceName];

    // if (changedSliceState) {
    //     console.log(`\n[STATE UPDATED: ${sliceName}]`);
    //     // console.log(`\n[STATE UPDATED]`);
    //     console.log('VALUE:', JSON.stringify(changedSliceState, null, 2));
    // } else {
    //     console.log('\n[STATE UPDATED: Global]');
    // }

    console.log('----------------------\n');

    return result;
};

export default loggerMiddleware;
