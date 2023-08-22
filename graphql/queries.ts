import { gql } from '@apollo/client'

export const GET_NOVELS = gql`
  query Novels {
    novels {
      authors {
        name
        novelId
        id
      }
      id
      title
      image
      createdAt
      updatedAt
    }
  }
`

export const GET_NOVEL = gql`
	query Novel($id: ID!) {
		novel(id: $id) {
			authors {
				id
				name
				novelId
			}
			id
			image
			title
		}
	}
`;
