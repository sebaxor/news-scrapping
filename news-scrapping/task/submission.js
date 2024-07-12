const { namespaceWrapper } = require('@_koii/namespace-wrapper');
class Submission {




  

  /**
   * Executes your task, optionally storing the result.
   *
   * @param {number} round - The current round number
   * @returns {void}
   */
  async task(round) {
    try {
      console.log('ROUND', round);
      const result = '';
      const axios = require('axios');
      const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=9aa287c412ec4817bee32f003c8ae166`;
      let noticias = null;
      try {
        const response = await axios.get(url);
        noticias = response.data.articles;        
      } catch (error) {
        console.error('Error al obtener las noticias:', error);
      }

      var i = 0;
      noticias.forEach(async noticia => {

        await namespaceWrapper.storeSet('url'+ i, noticia.url);
        await namespaceWrapper.storeSet('title' + i, noticia.url);
        await namespaceWrapper.storeSet('description' + i, noticia.description);
        
        result += 'url'+i+ ':'+ noticia.url + '\n';
        result += 'title'+i+ ':'+ noticia.title+ '\n';
        result += 'description'+i+ ':'+ noticia.description+ '\n';

        console.log('url',i, noticia.url);
        console.log('title', i, noticia.title);
        console.log('description',i, noticia.description);
        console.log('-----------------------------');
      
        i++;
      });

    
      // Optional, return your task
      return result;
    } catch (err) {
      console.log('ERROR IN EXECUTING TASK', err);
      return 'ERROR IN EXECUTING TASK' + err;
    }
  }




  /**
   * Submits a task for a given round
   *
   * @param {number} round - The current round number
   * @returns {Promise<any>} The submission value that you will use in audit. Ex. cid of the IPFS file
   */
  async submitTask(round) {
    console.log('SUBMIT TASK CALLED ROUND NUMBER', round);
    try {
      console.log('SUBMIT TASK SLOT', await namespaceWrapper.getSlot());
      const submission = await this.fetchSubmission(round);
      console.log('SUBMISSION', submission);
      await namespaceWrapper.checkSubmissionAndUpdateRound(submission, round);
      console.log('SUBMISSION CHECKED AND ROUND UPDATED');
      return submission;
    } catch (error) {
      console.log('ERROR IN SUBMISSION', error);
    }
  }
  /**
   * Fetches the submission value
   *
   * @param {number} round - The current round number
   * @returns {Promise<string>} The submission value that you will use in audit. It can be the real value, cid, etc.
   *
   */
  async fetchSubmission(round) {
    console.log('FETCH SUBMISSION');
    // Fetch the value from NeDB
    const value = await namespaceWrapper.storeGet('value'); // retrieves the value
    // Return cid/value, etc.
    return value;
  }
}
const submission = new Submission();
module.exports = { submission };
