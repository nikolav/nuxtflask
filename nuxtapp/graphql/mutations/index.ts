export const M_STORAGE_FILE_REMOVE = gql`
  mutation m_storageRemoveFile($fileID: String!) {
    storageRemoveFile(file_id: $fileID) { 
      error, 
      file {
        id,
        data {
          file_id
        }
      }
    }
  }
`;
