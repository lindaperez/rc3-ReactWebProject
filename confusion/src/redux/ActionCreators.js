/**
 * Created by Roslindapp on 4/24/19.
 */
import * as ActionType from './ActionTypes';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionType.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});