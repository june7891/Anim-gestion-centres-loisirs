import {createContext, useState} from 'react';

export const ParticipantContext = createContext({
    participant:{},
    parentOne:{},
    parentTwo:{},
    emergencyContact:{}
});

export default function Information({children}) {
    const[participantInfo, setParticipantInfo] = useState({
        participant: {
            firstname:"",
            lastname:"",
            dateOfBirth: "",
            schoolLevel: "",
            schoolType: "",
            schoolName:"",
            address:"",
            city:"",
            postalCode:"",
            ficheSanitaire:"",
            vaccination:"",
            insurance:""
        },

        parentOne:{
            firstname:"",
            lastname:"",
            phoneNumber:"",
            email:""
        },
        parentTwo:{
            firstname:"",
            lastname:"",
            phoneNumber:"",
            email:""
        },

        emergencyContact: {
            firstname:"",
            lastname:"",
            phoneNumber:""
        }


    });

    return(
        <ParticipantContext.Provider value={participantInfo}>
            {children}

        </ParticipantContext.Provider>
    )


}