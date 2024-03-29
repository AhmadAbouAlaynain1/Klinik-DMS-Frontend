import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

const fetchPatient = ({ queryKey }) => {
  const patientId = queryKey[1];
  return axios.get(`${baseURL}/patient/${patientId}`);
};

export const usePatientData = (patientId) => {
  const queryClient = useQueryClient();
  return useQuery(["patient", patientId], fetchPatient, {
    select: (data) => {
      return data.data;
    },
    initialData: () => {
      const patient = queryClient
        .getQueryData("patients")
        ?.data?.find((patient) => patient.id === parseInt(patientId));

      if (patient) {
        return {
          data: patient,
        };
      } else {
        return undefined;
      }
    },
  });
};
