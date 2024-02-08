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


export const M_docsUpsert = gql`
  mutation m_docsUpsert($topic: String!, $data: JsonData!, $id: ID) {
    docsUpsert(topic: $topic, data: $data, id: $id)    
  }
`;


export const M_docsRm = gql`
  mutation m_docsRm($topic: String!, $id: ID!) {
    docsRm(topic: $topic, id: $id)
  }
`;


export const M_docUpsert = gql`
  mutation m_docUpsert($doc_id: String!, $data: JsonData!) {
    docUpsert(doc_id: $doc_id, data: $data)
  }
`;


// schema {
//   query: Query
//   mutation: Mutation
// }

// scalar JsonData

// type Var {
//   id: ID!
//   name: String!
//   value: String
// }

// type StorageFileInfo {
//   id: ID!
//   file_id: String!
//   user_id: Int!
//   title: String!
//   description: String!
//   filename: String!
//   path: String!
//   size: Int!
//   mimetype: String!
//   public: Boolean!
//   created_at: String!
//   updated_at: String!
// }

// type StorageFileRemovedDataInfo {
//   file_id: String!
//   user_id: Int!
//   title: String!
//   description: String!
//   filename: String!
//   path: String!
//   size: Int!
//   mimetype: String!
//   public: Boolean!
// }

// type StorageFileRemovedInfoSuccess {
//   id: ID!
//   data: StorageFileRemovedDataInfo!
//   created_at: String!
//   updated_at: String!
// }

// type StorageFileRemovedInfo {
//   error: String
//   file: StorageFileRemovedInfoSuccess
// }

// type Query {

//   # docs
//   docsByTopic(topic: String!): [JsonData!]!

//   status: String!

//   # vars
//   vars: [Var!]!

//   # storage
//   storageList: [StorageFileInfo!]!
// }

// type Mutation {

//   # storage
//   storageRemoveFile(file_id: String!): StorageFileRemovedInfo

//   # docs
//   docsUpsert(topic: String!, data: JsonData!, id: ID): JsonData!
//   docsRm(topic: String!, id: ID!): JsonData
// }
