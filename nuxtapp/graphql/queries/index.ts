export const Q_statusCheck = gql`
  query q_statusCheck {
    status
  }
`;

export const Q_vars = gql`
  query q_vars {
    vars {
      id
      name
      value
    }
  }
`;

export const Q_storageList = gql`
  query q_storageList {
    storageList {
      id
      file_id
      title
      description
      filename
      path
      size
      mimetype
      public
      created_at
      updated_at
    }
  }
`;

export const Q_docsByTopic = gql`
  query q_docsByTopic($topic: String!) {
    docsByTopic(topic: $topic)
  }
`;

export const Q_docByDocId = gql`
  query q_docByDocId($doc_id: String!) {
    docByDocId(doc_id: $doc_id)
  }
`;

export const Q_tagsByDocId = gql`
  query q_tagsByDocId($id: ID!) {
    tagsByDocId(id: $id)
  }
`;
