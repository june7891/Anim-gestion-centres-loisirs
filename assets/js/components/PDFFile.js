import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const PDFFile = (props) => {
  return (

<Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>
        <h3>Fiche de renseignements</h3>
        <div className="col-lg-8">
        <div className="card mb-4 participant-detail-card-body">
          <div className="card-body participant-detail-card-body">
        <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Nom de famille</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{props.lastName}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Prénom</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{props.firstName}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Date de naissance</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{props.dateOfBirth}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Adresse</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{props.address} <br/> {props.postalCode} {props.city}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
                 <div className="col-sm-6">
                 <p className='details-title'>PARENT 1</p>
            </div>
            </div>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Nom de famille</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{props.parentOneLastname}</p>
              </div>
            </div>
            <hr/>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Prénom</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{props.parentOneFirstname}</p>
              </div>
            </div>
            <hr/>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-6">
                <p className="text-muted mb-0">{props.parentOneEmail}</p>
              </div>
             
            </div>
            <hr/>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">N° de téléphone</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{props.parentOnePhone}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
                 <div className="col-sm-6">
                 <p className='details-title'>PARENT 2</p>
            </div>
            </div>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Nom de famille</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{props.parentTwoLastname}</p>
              </div>
            </div>
            <hr/>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Prénom</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{props.parentTwoFirstname}</p>
              </div>
            </div>
            <hr/>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-6">
                <p className="text-muted mb-0">{props.parentTwoEmail}</p>
              </div>
            </div>
            <hr/>
           
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">N° de téléphone</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{props.parentTwoPhone}</p>
              </div>
            </div>
            <hr/>
        </div>
        </div>
        </div>
       </Text>
      </View>
     
    </Page>
  </Document>

  )
}

export default PDFFile;

