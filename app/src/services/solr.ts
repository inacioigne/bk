import axios from "axios";

function search() {
    
    const api = axios.create({
      baseURL: "http://192.168.128.4:8983/solr/",
    });  
  
   
    return api;
  }
  
export const solr = search()