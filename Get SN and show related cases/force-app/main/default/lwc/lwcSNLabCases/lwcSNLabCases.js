import { LightningElement, track, wire, api} from 'lwc';
import getSuggestedCasesLab from '@salesforce/apex/CaseControllerLab.getSuggestedCasesLab';

//define datatable columns with customized Case Number URL column
const columns = [
    {
        label: 'Número do caso', 
        fieldName: 'URLField',
        fixedWidth: 120,
        type: 'url', 
        typeAttributes: { 
            label: {
                fieldName: 'CaseNumber'
            },
            target: '_blank'
        },
        sortable: true 
    },
    { label: 'Asunto do caso', fieldName: 'Subject' },
    { label: 'Eventos de erro', fieldName: 'EventosErro' },
    { label: 'Problemas encontrados', fieldName: 'ProblemasEncontrados' }     
];

export default class SuggestedCases extends LightningElement {

    @api recordId; //it will be passed from the screen
    @track records; //datatable records
    @track columns; //datatable columns

    //retrieve suggested cases based on case recordId
    @wire(getSuggestedCasesLab,{caseId: '$recordId'})
    wiredCases({ error, data }) {
        if (data) {
            let URLField;
            let EventosErro;
            let ProblemasEncontrados;
            //retrieve Id, create URL with Id and push it into the array
            this.records = data.map(item=>{
                URLField = '/lightning/r/Case/' + item.Id + '/view?';
                EventosErro = item.Eventos_de_erro__c;
                ProblemasEncontrados = item.Problemas_encontrados__c;
               // tempConList.push(tempConRec);
                return {...item,URLField,EventosErro,ProblemasEncontrados};                
            });
            this.columns = columns;
            this.error = undefined;
        }else if (error) {
            this.error = error;
            this.records = undefined;
        }
    }
}
    