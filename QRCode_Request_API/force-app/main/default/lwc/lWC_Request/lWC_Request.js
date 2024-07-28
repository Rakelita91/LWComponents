import { LightningElement, track, api} from 'lwc';
import qrcode from './qrcode.js';
//import CaseId from '@salesforce/schema/CaseArticle.CaseId';
import IMAGES from "@salesforce/resourceUrl/static_images";

export default class LWC_Request extends LightningElement {

    Image1 = IMAGES + '/static_images/images/Logo1.png';
    Image2 = IMAGES + '/static_images/images/Logo2.png';
   
    @track myInfo;
    @track myInfo1;
    @track myInfo2;
    @track myInfo3;
    @track myInfo4;
    @track myInfo5;
    @track myInfo6;
    @track myInfo7;
    @track myToken;
    @api recordId;

    toggleIconName = 'utility:preview';
    toggleButtonLabel = 'Gerar';

    connectedCallback() {
        // La variable 'recordId' contiene el ID del caso actual
        if (this.recordId) {
            console.log('ID del caso actual:', this.recordId);
            // Puedes usar this.recordId en tu lógica para hacer la solicitud GET u otras acciones.
        } else {
            console.error('No se pudo obtener el ID del caso actual.');
        }
    }
        getInfo() {
           this.isButtonDisabled = true;
           const URLcallPost = 'https://url_salesforce_domain/services/oauth2/token?grant_type=password&client_id=clientId&client_secret=client_secret&username=email&password=password'; 
            fetch(URLcallPost, {
            method: "POST",
           // mode: 'same-origin', // no-cors, *cors, same-origin
           // mode: 'no-cors', 
        }).then((response) => response.json())
            .then(reposT => {
            
              console.log(reposT)
                this.myToken = reposT.access_token;
            });

   
        const id = `${this.recordId}`;
        const calloutURI = `https://url_salesforce_domain/services/data/v51.0/sobjects/Case/${id}`;
        
    
          const token = `${this.myToken}`;
          
              fetch(calloutURI, {
                method: "GET",
               // mode: 'same-origin', // no-cors, *cors, same-origin
               //mode: 'no-cors', 
                headers:{
                    'Authorization': 'Bearer '+ token
                    //'Content-Type': 'application/x-www-form-urlencoded'
                }, 
            }).then((response) => response.json())
                .then(repos => {
                 //   console.log(repos)
                 //  this.myInfo = repos.records[1].CaseNumber;
                 //  console.log(this.myInfo);
                  // this.myInfo1 = repos.records[1].Id;
                  console.log(repos)
                    this.myInfo = repos.CaseNumber;
                    this.myInfo1 = repos.Id;                 
                    this.myInfo2 = repos.Modelo_Produto_RMA__c;                 
                    this.myInfo3 = repos.Serial_Number__c;                
                    this.myInfo4 = repos.CRM_Ticket__c;                 
                    this.myInfo5 = repos.Serial_do_inversor_de_reposi_o__c;               
                    this.myInfo6 = repos.Data_de_aprova_o__c;                
                    this.myInfo7 = repos.Aprovado_por__c; 
                });      
              // retrieve the classList from the specific element
        const contentBlockClasslist = this.template.querySelector(
            '.lgc-id_content-toggle'
        ).classList;
    
        // toggle the hidden class
        contentBlockClasslist.toggle('slds-hidden');
        
        // if the current icon-name is `utility:preview` then change it to `utility:hide`
       // if (this.toggleIconName === 'utility:preview') {
       //     this.toggleIconName = 'utility:hide';
       //     this.toggleButtonLabel = 'Reveal content';
      //  } else {
      //      this.toggleIconName = 'utility:preview';
     //       this.toggleButtonLabel = 'Hide content';
      //  }
      
        if (this.toggleIconName === 'utility:preview') {
            this.toggleIconName = 'utility:hide';
            this.toggleButtonLabel = 'Ocultar';      
        } else {
            this.toggleIconName = 'utility:preview';
            this.toggleButtonLabel = 'Mostrar';
        }
    }

    renderedCallback(){
        const qrCodeGenerated = new qrcode(0, 'L');
        let strForGenerationOfQRCode = `
        Case Number: ${this.myInfo}     
        Product Model: ${this.myInfo2}  
        Serial Number: ${this.myInfo3}
        Ticket: ${this.myInfo4}
        New Serial Number: ${this.myInfo5}
        Approval Data: ${this.myInfo6}
        Approval By: ${this.myInfo7}
        `;
        strForGenerationOfQRCode = strForGenerationOfQRCode.replace(/, /g, ',\u00A0');
        qrCodeGenerated.addData(strForGenerationOfQRCode);
        qrCodeGenerated.make();
        let element = this.template.querySelector(".qrcode2");
        element.innerHTML = qrCodeGenerated.createSvgTag({});
    }

    imprimirContenido() {

        let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');
        let divId = this.template.querySelector('.pdf');

        mywindow.document.write(`<html><head><title></title>`);
        mywindow.document.write('</head><body >');
        mywindow.document.write(document.getElementById(divId).innerHTML);
        mywindow.document.write('</body></html>');
      
        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/
      
        mywindow.print();
        mywindow.close();
        
        return true;
    }
}