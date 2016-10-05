import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-client-preview';

import styles from './SiteList.module.scss';
import * as strings from 'mystrings';
import { ISiteListWebPartProps } from './ISiteListWebPartProps';
import MockHttpClient from './MockHttpClient';
import {EnvironmentType} from '@microsoft/sp-client-base';
export interface ISPSites{
  value:ISPSite[];
}
export interface ISPSite{
  Title:string;
  Path:string;
}

export default class SiteListWebPart extends BaseClientSideWebPart<ISiteListWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.siteList}">
        <div class="${styles.container}">
          <div class="ContainerCards">
	            <div id="spSiteContainer">
          </div>
        </div>
        </div>
      </div>`;
      this._renderSiteAsync();
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: "Configure WebPart"
          },
          groups: [
            {
              groupName:"Scope",
              groupFields: [
                PropertyPaneToggle('ShowOnlySiteUnderCurrentSite', {
                  label: "Show only sub sites under this site:"
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _getMockSiteData():Promise<ISPSites>{
return MockHttpClient.get(this.context.pageContext.web.absoluteUrl).then((data:ISPSite[])=>
{
var siteData:ISPSites={value:data};
return siteData;
}) as Promise<ISPSites>;
  }

  private _renderSite(items: ISPSite[]): void {
    let html: string = '';

    items.forEach((item: ISPSite) => {
        html+=`
		<div class="ContainerCardFocusZone">
			<div  class="ContainerCard-NoActivities">
				<div>
					<a href="${item.Path}" id="A_6">
					   <div id="DIV_7" role="gridcell" class="ContainerCard-header">
						  <div  title="siteTitle">
							<div id="DIV_9" class="ContainerCard-headerBackground" style="background-color:#4e257f;"></div>
							<div id="DIV_10" class="ContainerCard-acronym" style="background-color:#4e257f;" role="presentation" aria-hidden="true">${item.Title.charAt(0)}</div>
							<div id="DIV_11" class="ContainerCard-title" aria-label="Site teams">${item.Title}</div>
						  </div>
					    </div>
                    </a>
                </div>
      </div>
 </div>`;
    });

    const listContainer: Element = this.domElement.querySelector('#spSiteContainer');
    listContainer.innerHTML = html;
}

  private _renderSiteAsync(): void {
    // Local environment
    if (this.context.environment.type === EnvironmentType.Local) {
        this._getMockSiteData().then((response) => {
        this._renderSite(response.value);
        }); }
        else {
        this._getSiteData()
        .then((response) => {
            this._renderSite(response.value);
        });
    }
}

  private _getSiteData():Promise<ISPSites>{
/*return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl+
'/_api/search/query?querytext=path:\''+this.context.pageContext.web.absoluteUrl+'*\'&refinementfilters=\'contentclass:equals("STS_Web")\'')
.then((response:Response)=>{
  console.log(response);
return null;
});*/
return null;
  }
}
