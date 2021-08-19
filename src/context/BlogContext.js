import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer.js';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blogPosts':
      return action.payload;
    case 'edit_blogPost':
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    case 'delete_post':
      return state.filter((blogPost) => blogPost.id != action.payload);
    case 'addBlogPost':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 9999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get('/blogPosts');

    dispatch({
      type: 'get_blogPosts',
      payload: response.data,
    });
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post('/blogPosts', {
      title: title,
      content: content,
    });
    // dispatch({
    //   type: 'addBlogPost',
    //   payload: { title: title, content: content },
    // });
    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogPosts/${id}`);
    dispatch({ type: 'delete_post', payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogPosts/${id}`, {
      title: title,
      content: content,
    });
    // dispatch({
    //   type: 'edit_blogPost',
    //   payload: { id: id, title: title, content: content },
    // });
    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
