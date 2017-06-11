import chai from 'chai';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import * as auth from '../../actions/searchAction';
import types from '../../actions/actionTypes';

const expect = chai.expect;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('searchAction', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should return type and payload on successfull user search', () => {
    const result = [{}];
    expect(auth.searchUserSuccess(result)).to.eql({
      type: types.SEARCH_USER,
      result
    });
  });

  it('should return type and payload on successfull document search', () => {
    const result = [{}];
    expect(auth.searchDocumentSuccess(result)).to.eql({
      type: types.SEARCH_DOCUMENT, result
    });
  });

  it('should return type and user search result ', (done) => {
    const expectedActions = [{ type: 'SEARCH_USER', result: { users: [], pagination: {} } }];

    const store = mockStore({ documents: {
      documents: [],
      isCreated: false,
      isCreating: false,
      isDeleting: false,
    } });

    store.dispatch(auth.searchUser(0, 1)).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { users: [], pagination: {} }
      });
    });
  });

  it('should return type and document search result', (done) => {
    const expectedActions = [
      { type: 'SEARCH_DOCUMENT', result: { documents: [], pagination: {} } }
    ];

    const store = mockStore({ documents: {
      documents: [],
      isCreated: false,
      isCreating: false,
      isDeleting: false,
    } });

    store.dispatch(auth.searchDocument(1, {})).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { documents: [], pagination: {} }
      });
    });
  });
});
