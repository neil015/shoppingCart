// export default function CourseReducer (state =[], action) {
//     switch(action.type) {
//       case 'CREATE_COURSE':
//         return [...state, Object.assign({}, action.course)];
//       default:
//         return state;
//     }
// }

export default function LoadItemsSuccess (state ={}, action) {
    switch(action.type) {
        case 'LOAD_ITEM_SUCCESS':
            return action.items;
        default:
            return state;
    }
}
