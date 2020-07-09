import * as ActionTypes from './actionTypes';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    
    return fetch('http://localhost:3001/comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};

export const postFeedback = (newFeedback) => (dispatch)=> {
    console.log(newFeedback)
    fetch('http://localhost:3001/feedback', {
        method:'POST',
        body: JSON.stringify(newFeedback),
        headers:{
            'Content-Type': 'application/json'
        },
        credentials:'same-origin'
    })
        .then(res=>{
            if(res.ok){
                return res
            } else {
                var error = new Error('Error: ' + res.status + ':' + res.statusText);
                error.response = res;
                throw error;
            }
        }, error => {
            throw error
        })
        .then(res=>res.json())
        .then(res=>alert('Thank you for your Feedback!', JSON.stringify(res)))
        .catch(error=>console.log(error.message));
}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    fetch('http://localhost:3001/dishes')
        .then(res=>{
            if(res.ok){
                return res;
            } else {
                let error = new Error('Error ' + res.status + ':' + res.statusText);
                error.response = res;
                throw error;
            }
        },(error)=>{
            var errMessage = new Error(error.message);
            throw errMessage;
        })
        .then(res => res.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch((error)=>dispatch(dishesFailed(error)));
}

const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING,
});

const dishesFailed = (error) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: error
});

const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});


export const fetchComments = () => (dispatch) => {
    fetch('http://localhost:3001/comments')
        .then(res=>{
            if(res.ok){
                return res;
            } else {
                let error = new Error('Error ' + res.status + ':' + res.statusText);
                error.response = res;
                throw error;
            }
        },(error)=>{
            var errMessage = new Error(error.message);
            throw errMessage;
        })
        .then(res => res.json())
        .then(comments => dispatch(addComments(comments)))
        .catch((error)=>dispatch(commentsFailed(error)));
};

const commentsFailed = (error) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: error
});

const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});


export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));

    fetch('http://localhost:3001/leaders')
        .then(res=>{
            if(res.ok){
                return res;
            } else {
                let error = new Error('Error ' + res.status + ':' + res.statusText);
                error.response = res;
                throw error;
            }
        },(error)=>{
            var errMessage = new Error(error.message);
            throw errMessage;
        })
        .then(res => res.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch((error)=>dispatch(leadersFailed(error)));
}

const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING,
});

const leadersFailed = (error) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: error
});

const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});