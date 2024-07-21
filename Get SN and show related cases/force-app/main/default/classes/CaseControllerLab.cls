public with sharing class CaseControllerLab {
    @AuraEnabled (cacheable=true)
    public static List<Case> getSuggestedCasesLab(String caseId){
        List<Case> lstCase = new List<Case>(); 
        //retrieve case SN of existing case       
        Case caseObj = [SELECT Serial_Number__c, Serial_do_inversor_de_reposi_o__c FROM Case WHERE Id=:caseId];

        //since all the keywords need to searched so, need to put 'OR' condition between the keywords
        List<String> strList = caseObj.Serial_Number__c.split(' ');String strSearch = String.join(strList, '\' OR \'') + '*'; System.debug('strSearch=' + strSearch);List<List<SObject>> searchList = [FIND :strSearch IN ALL FIELDS RETURNING Case(CaseNumber, Subject, Eventos_de_erro__c, Problemas_encontrados__c WHERE Serial_Number__c !=:caseId OR Serial_do_inversor_de_reposi_o__c!=:caseId ORDER BY CreatedDate DESC LIMIT 20)];if(searchList.size()>0){return searchList[0];}return lstCase;}}
