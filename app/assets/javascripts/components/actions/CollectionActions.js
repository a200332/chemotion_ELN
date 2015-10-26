import alt from '../alt';
import CollectionsFetcher from '../fetchers/CollectionsFetcher';
import UIStore from '../stores/UIStore';
import ElementStore from '../stores/ElementStore';
import Utils from '../utils/Functions';

class CollectionActions {
  takeOwnership(params) {
    CollectionsFetcher.takeOwnership(params)
      .then((roots) => {
        this.dispatch(roots);
      }).catch((errorMessage) => {
        console.log(errorMessage);
      });
  }

  // TODO #2...centralized error handling maybe ErrorActions?
  fetchUnsharedCollectionRoots() {
    CollectionsFetcher.fetchUnsharedRoots()
      .then((roots) => {
        this.dispatch(roots);
      }).catch((errorMessage) => {
        console.log(errorMessage);
      });
  }

  fetchSharedCollectionRoots() {
    CollectionsFetcher.fetchSharedRoots()
      .then((roots) => {
        this.dispatch(roots);
      }).catch((errorMessage) => {
        console.log(errorMessage);
      });
  }

  fetchRemoteCollectionRoots() {
    CollectionsFetcher.fetchRemoteRoots()
      .then((roots) => {
        this.dispatch(roots);
      }).catch((errorMessage) => {
        console.log(errorMessage);
      });
  }

  createSharedCollections(params) {
    CollectionsFetcher.createSharedCollections(params)
      .then(() => {
        this.dispatch();
      }).catch((errorMessage) => {
        console.log(errorMessage);
      });
  }

  bulkUpdateUnsharedCollections(params) {
    CollectionsFetcher.bulkUpdateUnsharedCollections(params)
      .then(() => {
        this.dispatch();
      }).catch((errorMessage) => {
        console.log(errorMessage);
      });
  }

  updateSharedCollection(params) {
    CollectionsFetcher.updateSharedCollection(params)
      .then(() => {
        this.dispatch();
      }).catch((errorMessage) => {
        console.log(errorMessage);
      });
  }

  createUnsharedCollection(params) {
    CollectionsFetcher.createUnsharedCollection(params)
      .then(() => {
        this.dispatch();
      }).catch((errorMessage) => {
        console.log(errorMessage); 
      });
  }

  downloadReportCollectionSamples(){
    const {currentCollectionId} = UIStore.getState();
    Utils.downloadFile({contents: "api/v1/reports/export_samples_from_collection_samples?id=" + currentCollectionId});
  }

  downloadReportCollectionReactions(){
    const {currentCollectionId} = UIStore.getState();
    Utils.downloadFile({contents: "api/v1/reports/export_samples_from_collection_reactions?id=" + currentCollectionId});
  }

  downloadReportCollectionWellplates(){
    const {currentCollectionId} = UIStore.getState();
    Utils.downloadFile({contents: "api/v1/reports/export_samples_from_collection_wellplates?id=" + currentCollectionId});
  }

  downloadReport(tab){
    const {currentCollectionId} = UIStore.getState();

    Utils.downloadFile({contents: "api/v1/reports/excel?id=" + currentCollectionId +"&tab="+tab});
  }

  downloadReportWellplate(wellplateId){    
    Utils.downloadFile({contents: "api/v1/reports/excel_wellplate?id=" + wellplateId});
  }

  downloadReportReaction(reactionId){    
    Utils.downloadFile({contents: "api/v1/reports/excel_reaction?id=" + reactionId});
  }
}

export default alt.createActions(CollectionActions);
