const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST = 'UPDATE-NEW-POST';
const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE';

export interface PostsProps {
    id: number
    message: string
    likesCount: number
}

export interface UsersProps {
    id: number
    name: string
}

export interface MessagesProps {
    message: string
}

export interface StateProps {
    posts?: PostsProps[]
    users?: UsersProps[]
    messages?: MessagesProps[]
    textArea?: string
}

export interface StorePropsType {
    state?: StateProps
    getState?: () => object
    subscribe?: (state: StateProps) => void
    dispatch?: (action: DispatchPropsType) => void
    newMessage?: string
}

export interface DispatchPropsType {
    type: string
    newText?: string
    newMessage?: string
}

export const store = {
    _state: {
        posts: [
            {id: 1, message: 'It\'s my first post', likesCount: 3},
            {id: 2, message: 'I want to learn React and TypeScript.', likesCount: 5},
            {id: 3, message: 'I learn English every day.', likesCount: 3},
            {id: 4, message: 'Hi, how are you?', likesCount: 4}
        ],
        messages: [
            {message: 'Hello Dima, how are you?'},
            {message: 'Not bad)) And you?'},
            {message: 'I`m happy!'},
            {message: 'Buy, Dima!'},
            {message: 'Buy, Sasha!'}
        ],
        newMessage: '',
        users: [
            {id: 1, name: 'Sasha'},
            {id: 2, name: 'Kate'},
            {id: 3, name: 'Illya'},
            {id: 4, name: 'Sergey'},
            {id: 5, name: 'Dima'}
        ],
        textArea: ''
    },
    _callSubscriber(state: StateProps) {
        console.log('State changed')
    },
    getState() {
        return this._state;
    },
    subscribe(observer: (state: StateProps) => void) {
        this._callSubscriber = observer; // pattern observer
    },
    dispatch(action: DispatchPropsType) {
        switch (action.type) {
            case ADD_POST:
                let post: PostsProps = {
                    id: 5,
                    message: this._state.textArea,
                    likesCount: 1
                }
                this._state.posts.push(post)
                this._state.textArea = '';
                this._callSubscriber(this._state);
                break;
            case UPDATE_NEW_POST:
                this._state.textArea = action.newText!; // ненулевой оператор утверждения !
                this._callSubscriber(this._state);
                break;
            case ADD_MESSAGE:
                let messageBody: string = this._state.newMessage;
                this._state.messages.push({message: messageBody})
                this._state.newMessage = '';
                this._callSubscriber(this._state);
                break;
            case UPDATE_NEW_MESSAGE:
                this._state.newMessage = action.newMessage!; // ненулевой оператор утверждения !
                this._callSubscriber(this._state);
                break;
        }
    }
}

// функции, которые возвращают action (объект)

// add posts
export const addPostActionCreator = () => ({type: ADD_POST});
export const onPostChangeActionCreator = (text: string) => ({type: UPDATE_NEW_POST, newText: text});

// add message
export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export const onMessageActionCreator = (message: string) => ({type: UPDATE_NEW_MESSAGE, newMessage: message});
