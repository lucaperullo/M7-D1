export default function (state = {}, action) {
  switch (action.type) {
    case "UPDATE_USER_INFO":
      return {
        ...state,
        user: action.payload,
      };
    case "ADD_FAVOURITE":
      return {
        ...state,
        user: {
          ...state.user,
          favourites: state.user.favourites.concat(action.payload),
        },
      };
    case "REMOVE_FAVOURITE":
      return {
        ...state,
        user: {
          ...state.user,
          favourites: state.user.favourites.filter(
            (favourite) => favourite.id !== action.payload.id
          ),
        },
      };
    case "ADD_RECENT_SEARCH":
      return {
        ...state,
        user: {
          ...state.user,
          recentSearches: state.user.recentSearches.concat(action.payload),
        },
      };
    case "STORE_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    case "SET_SELECTED_JOB":
      return {
        ...state,
        selectedJob: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          errors: state.errors.errors.concat(action.payload),
        },
      };
    case "DISPLAY_ERRORS":
      return {
        ...state,
        errors: {
          ...state.errors,
          show: action.payload,
        },
      };
    default:
      return state;
  }
}
