import {addPost, deletePost, profileReducer} from './profile-reducer';
import {ProfileType} from './ProfileContainer';

let state = {
    messageForNewPost: '',
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 0},
        {id: 2, message: 'It\'s my first post', likesCount: 23},
    ],
    profile: {} as ProfileType,
    status: '',
}

it('length of posts should be incremented', () => {
    // 1. test data
    let action = addPost('it-kamasutra.com')
    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.posts.length).toBe(3)
})

it('message of new post should be correct', () => {
    // 1. test data
    let action = addPost('it-kamasutra.com')
    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.posts[2].message).toBe('it-kamasutra.com')
})

it('after deleting length of messages should be decrement', () => {
    // 1. test data
    let action = deletePost(1)
    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.posts.length).toBe(1)
})

it(`after deleting length shouldn't be decrement if id is incorrect`, () => {
    // 1. test data
    let action = deletePost(1000)
    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.posts.length).toBe(2)
})