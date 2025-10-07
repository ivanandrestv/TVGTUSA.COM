import { GraphQLClient } from 'graphql-request'
import { 
  WordPressPost, 
  WordPressPostsResponse, 
  WordPressPostResponse, 
  WordPressCategoryResponse,
  GraphQLResponse 
} from '@/types/wordpress'

const graphqlEndpoint = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || 'https://redaccion.centraldenoticiasgt.com/graphql'
const categorySlug = process.env.NEXT_PUBLIC_CATEGORY_SLUG || 'tvgtusa'

const client = new GraphQLClient(graphqlEndpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
})

// Queries GraphQL
const GET_POSTS_QUERY = `
  query GetPosts($first: Int!, $after: String, $categoryName: String!) {
    posts(
      first: $first
      after: $after
      where: { categoryName: $categoryName }
    ) {
      nodes {
        id
        slug
        title
        date
        excerpt
        content
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        author {
          node {
            name
            slug
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
        tags {
          nodes {
            id
            name
            slug
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

const GET_POST_BY_SLUG_QUERY = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      date
      excerpt
      content
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      author {
        node {
          name
          slug
        }
      }
      categories {
        nodes {
          id
          name
          slug
        }
      }
      tags {
        nodes {
          id
          name
          slug
        }
      }
    }
  }
`

const GET_CATEGORY_QUERY = `
  query GetCategory($slug: String!) {
    category(id: $slug, idType: SLUG) {
      id
      name
      slug
      description
      count
    }
  }
`

const GET_FEATURED_POSTS_QUERY = `
  query GetFeaturedPosts($first: Int!, $categoryName: String!) {
    posts(
      first: $first
      where: { 
        categoryName: $categoryName
        orderby: { field: DATE, order: DESC }
      }
    ) {
      nodes {
        id
        slug
        title
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        author {
          node {
            name
            slug
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
      }
    }
  }
`

// Funciones para obtener datos
export async function getPosts(
  first: number = 10,
  after?: string
): Promise<WordPressPostsResponse> {
  try {
    const variables = {
      first,
      after,
      categoryName: categorySlug,
    }

    const response = await client.request<WordPressPostsResponse>(
      GET_POSTS_QUERY,
      variables
    )

    return response
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw new Error('Failed to fetch posts')
  }
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const response = await client.request<WordPressPostResponse>(
      GET_POST_BY_SLUG_QUERY,
      { slug }
    )

    return response.post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function getCategory(): Promise<WordPressCategoryResponse['category'] | null> {
  try {
    const response = await client.request<WordPressCategoryResponse>(
      GET_CATEGORY_QUERY,
      { slug: categorySlug }
    )

    return response.category
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}

export async function getFeaturedPosts(limit: number = 3): Promise<WordPressPost[]> {
  try {
    const response = await client.request<{ posts: { nodes: WordPressPost[] } }>(
      GET_FEATURED_POSTS_QUERY,
      {
        first: limit,
        categoryName: categorySlug,
      }
    )

    return response.posts.nodes
  } catch (error) {
    console.error('Error fetching featured posts:', error)
    return []
  }
}

// Función para obtener todos los slugs de posts (para generar páginas estáticas)
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const GET_ALL_SLUGS_QUERY = `
      query GetAllSlugs($categoryName: String!) {
        posts(where: { categoryName: $categoryName }) {
          nodes {
            slug
          }
        }
      }
    `

    const response = await client.request<{ posts: { nodes: { slug: string }[] } }>(
      GET_ALL_SLUGS_QUERY,
      { categoryName: categorySlug }
    )

    return response.posts.nodes.map(post => post.slug)
  } catch (error) {
    console.error('Error fetching post slugs:', error)
    return []
  }
}

// Función para formatear fecha
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Función para obtener extracto limpio
export function getCleanExcerpt(excerpt: string, maxLength: number = 150): string {
  const cleanExcerpt = excerpt
    .replace(/<[^>]*>/g, '') // Remover HTML tags
    .replace(/&[^;]+;/g, '') // Remover entidades HTML
    .trim()

  if (cleanExcerpt.length <= maxLength) {
    return cleanExcerpt
  }

  return cleanExcerpt.substring(0, maxLength).trim() + '...'
}
