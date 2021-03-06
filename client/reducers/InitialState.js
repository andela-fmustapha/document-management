const InitialState = {
  isAuthenticated: false,
  loggedInUser: null,
  users: {
    rows: [],
    totalUsers: 0,
    pagination: {}
  },
  isListing: false,
  userDocuments: [],
  documents: {
    documents: { rows: [] },
    isCreated: false,
    isCreating: false,
    isDeleting: false,
    status: false,
    searchRoute: 'allDocuments',
  },
  currentDocument: null
};

export default InitialState;

