import {ISPSite} from './SiteListWebPart';
export default class MockHttpClient{
private static _sites:ISPSite[]=[
  {Title:"Australia",Path:"https://google.com/Australia"},
  {Title:"India", Path:"https://google.com/india"},
  {Title:"Japan", Path:"https://google.com/japan"},
  {Title:"Korea", Path:"https://google.com/korea"},
  {Title:"Asia", Path:"https://google.com/asia"},
  {Title:"Europe", Path:"https://google.com/europe"},
  {Title:"Austria", Path:"https://google.com/Austria"},
  {Title:"France", Path:"https://google.com/France"}
  ];
public static get(restUrl:string,options?:any):Promise<ISPSite[]>{
return new Promise<ISPSite[]>((resolve)=>{
  resolve(MockHttpClient._sites);
});
}
}