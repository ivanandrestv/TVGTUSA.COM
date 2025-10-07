export interface WordPressPost {
  id: string
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  featuredImage?: {
    node: {
      sourceUrl: string
      altText: string
      mediaDetails: {
        width: number
        height: number
      }
    }
  }
  author: {
    node: {
      name: string
      slug: string
    }
  }
  categories: {
    nodes: Array<{
      id: string
      name: string
      slug: string
    }>
  }
  tags?: {
    nodes: Array<{
      id: string
      name: string
      slug: string
    }>
  }
}

export interface WordPressCategory {
  id: string
  name: string
  slug: string
  description?: string
  count: number
}

export interface WordPressPageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string
  endCursor: string
}

export interface WordPressPostsResponse {
  posts: {
    nodes: WordPressPost[]
    pageInfo: WordPressPageInfo
  }
}

export interface WordPressPostResponse {
  post: WordPressPost
}

export interface WordPressCategoryResponse {
  category: WordPressCategory
}

export interface GraphQLResponse<T> {
  data: T
  errors?: Array<{
    message: string
    locations?: Array<{
      line: number
      column: number
    }>
    path?: string[]
  }>
}

export interface PostCardProps {
  post: WordPressPost
  featured?: boolean
}

export interface PaginationProps {
  pageInfo: WordPressPageInfo
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}
