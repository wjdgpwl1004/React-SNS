export const initialState = {
    mainPosts: [{
        User: {
            id: 1,
            nickname: '정곰',
        },
        content: '첫번째 글',
        img: 'https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E',
    }],
    imagePaths: [],
};

export const ADD_POST = 'ADD_POST';
export const ADD_DUMMY = 'ADD_DUMMY';

export const addPost = {
    type: ADD_POST,
};

export const addDummy = {
    type: ADD_DUMMY,
    data: {
        content: 'Hello',
        UserId: 1,
        User: {
            nickname: '제로초',
        },
    },
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case ADD_POST: {
            return {
                ...state,
            }
        }
        case ADD_DUMMY: {
            return {
                ...state,
                mainPosts: [action.data, ...state.mainPosts],
            };
        }
        default: {
            return {
                ...state,
            }
        }
    }
};

export default reducer;