import axios from 'axios';

export const SEARCH_INPUT = (searchInput, selectedOption) => {
    axios.post('/api/input', {
      searchInput: searchInput,
      selectedOption: selectedOption
    })
    .catch(error => console.error(error));
  };
  