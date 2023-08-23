import gql from "graphql-tag";

// Main query to get page-specific content


export const contentQuery = gql`
query Programs ($Page: String!) {
  pages: programs(where: { pageTitle: $Page }) {
    pageTitle
    id
    slug
    pageEn {
      ... on ComponentLayoutsTextBlock {
        richText
      }

    }
  }
}

`

export const pagesQuery = gql`
query Programs {
  pages: programs(sort: "order") {
    pageTitle
    pageTitleDe
    id
    slug
}
}

`


export const pageQuery = gql`

query Programs ($slug: String!) {
  subpage: programs (where: { slug: $slug }) {
    slug
    pageTitle
    pageEn {
      ... on ComponentProgramAbout {
        academicTitle
        duration
        language
      }
      ... on ComponentLayoutsTextBlock {
        richText
      }
      ... on ComponentLayoutsCollpasiblePanel{
        Collapsibles {
          title
          content
          website
          email
          sectionTitle
        }
      }

    }
    pageDe {
      ... on ComponentLayoutsTextBlock {
        richText
      }
      ... on ComponentProgramAbout {
        academicTitle
        duration
        language
      }
      ... on ComponentLayoutsCollpasiblePanel{
        Collapsibles {
          title
          content
          website
          email
        }
      }

    }

  }
}
`



export const HomeQuery = gql`
query Home {
  pages: home{
  	pageZoneEn {
      ... on ComponentLayoutsTextBlock {
        richText
      }

    }
    pageZoneDe {
      ... on ComponentLayoutsTextBlock {
        richText
      }

    }
  }
}

`


export const ContactQuery = gql`
query Contact {
  pages: contact{
  	pageZoneEn {
      ... on ComponentLayoutsTextBlock {
        richText
      }
      ... on ComponentContactContacts {
        	People {
            name
            role
            description
            email
            phone
            cv
          }
      }

    }
    pageZoneDe {
      ... on ComponentLayoutsTextBlock {
        richText
      }
      ... on ComponentContactContacts {
        	People {
            name
            role
            description
            email
            phone
            cv
          }
      }

    }
  }
}

`

export const ImpressumQuery = gql`
query Impressum {
  pages: impressum{
        richText
  }
}

`


export const DatenschutzQuery = gql`
query Datenschutz{
  pages: datenschutz{
            richText
  }
}

`


export const InternaQuery = gql`
query Interna {
  interna: internas{
    title
    slug
  }
}
`


export const InternPageQuery = gql`
query InternPage ($slug: String!) {
  subpage: internas(where: { slug: $slug } ){
    title
    slug
    code
    pageZone {
      ... on ComponentLayoutsTextBlock {
        richText

      }
       ... on ComponentLayoutsImageField {
        imageField{
          url
        }

      }
      ... on ComponentLayoutsGallery {
        galleryImages{
          url
        }

      }
      ... on ComponentLayoutsVideo {

        videoUrl


      }
      ... on ComponentLayoutsAudio {
        displayText
        audioFile{
          alternativeText
          mime
          url
        }



      }
      ... on ComponentLayoutsDownload {
        downloadFile{
          alternativeText
          mime
          url
        }
        displayName

      }

    }
  }
}
`


export const EventsQuery = gql`
query News($date: String!) {
  pages: news(where: {endDate_lt: $date },  sort: "date:DESC") {
    title
    id
    subtitle
    endTime
    category
    date
    endDate
    showDate
    extra
    slug
    series{
      title
      slug
    }
    semester{
      semesterTitle
    }
  }
}

`




export const EventQuery = gql`

query News($slug: String!) {
  subpage: news(where: { slug: $slug } ) {
    slug
    title
    subtitle
    category
    date
    endDate
    endTime
    showDate
    extra
    eventPage {
      ... on ComponentLayoutsTextBlock {
        richText

      }
       ... on ComponentLayoutsImageField {
        imageField{
          url
        }

      }
      ... on ComponentLayoutsGallery {
        galleryImages{
          url
        }

      }
      ... on ComponentLayoutsVideo {
        videoUrl


      }
      ... on ComponentLayoutsAudio {
        displayText
        audioFile{
          alternativeText
          mime
          url
        }



      }
      ... on ComponentLayoutsDownload {
        downloadFile{
          alternativeText
          mime
          url
        }
        displayName

      }

    }
  }
}
`

export const OldEventsQuery = gql`

query News($date: String!) {
  oldevents: news(where: { date_lt: $date }, sort: "date:DESC") {
    title
    id
    subtitle
    category
    endDate
    date
    showDate
    extra
    endTime
  }
}

`

export const CurrentEventsQuery = gql`

query Events($date: String!) {
  currentevents: news(where: {endDate_gte: $date}, sort: "date:ASC") {
    title
    id
    subtitle
    category
    endDate
    date
    slug
    endTime
    showDate
    extra
    series{
       slug
       title
     }
  }
}

`


export const LatestEventQuery = gql`

query News {
  subpage: news(limit: 1, sort: "date:DESC" ) {
    slug
    title
    date
    subtitle
    endDate
    category
    endTime
    showDate
    extra
    eventPage {
      ... on ComponentLayoutsTextBlock {
        richText

      }
       ... on ComponentLayoutsImageField {
        imageField{
          url
        }

      }
      ... on ComponentLayoutsGallery {
        galleryImages{
          url
        }

      }
      ... on ComponentLayoutsVideo {
        videoUrl


      }
      ... on ComponentLayoutsAudio {
        displayText
        audioFile{
          alternativeText
          mime
          url
        }



      }
      ... on ComponentLayoutsDownload {
        downloadFile{
          alternativeText
          mime
          url
        }
        displayName

      }

    }
  }
}
`

export const SeminarsQuery = gql`
query News($date: String!) {
  pages: seminars(where: {endDate_lt: $date },  sort: "date:DESC") {
    title
    id
    subtitle
    endTime
    category
    date
    endDate
    slug
    showDate
    extra
    semester{
      semesterTitle
    }
  }
}
`

export const CurrentSeminarsQuery = gql`

query Seminars($date: String!) {
  currentseminars: seminars(where: {endDate_gte: $date}, sort: "date:ASC"){
    title
    id
    subtitle
    category
    endDate
    date
    showDate
    extra
    slug
    endTime
    semester{
      semesterTitle
    }
  }
}

`


export const SeminarQuery = gql`

query Seminar($slug: String!) {
  subpage: seminars(where: { slug: $slug } ) {
    slug
    title
    subtitle
    category
    date
    endDate
    endTime
    showDate
    extra
    semester{
      semesterTitle
    }
    eventPage {
      ... on ComponentLayoutsTextBlock {
        richText

      }
       ... on ComponentLayoutsImageField {
        imageField{
          url
        }

      }
      ... on ComponentLayoutsGallery {
        galleryImages{
          url
        }

      }
      ... on ComponentLayoutsVideo {
        videoUrl


      }
      ... on ComponentLayoutsAudio {
        displayText
        audioFile{
          alternativeText
          mime
          url
        }



      }
      ... on ComponentLayoutsDownload {
        downloadFile{
          alternativeText
          mime
          url
        }
        displayName

      }

    }
  }
}
`

export const SemesterQuery = gql`
query Semesters {
  semester: semesters(where: {currentSemester : true}) {
  semesterTitle
  }
}
`


export const CandidatesQuery = gql`

query Candidates {
  candidates: candidates( where: { status: "phdCandidate"} ){
    slug
    name
  }
}
`

export const FtCandidatesQuery = gql`

query FtCandidates {
  ftcandidates: candidates( where: { status: "Forthcoming"}){
    slug
    name
  }
}
`


export const CandidateQuery = gql`

query Candidate($slug: String!) {
  candidate: candidates(where: { slug: $slug } )  {
    slug
    name
    id
    name
    bio
    cv
    portfolio{
    ... on ComponentCandidatesPortfolioEntry {
        portfolioEntryTitle
       portfolioEntryMedia{
         url
       }
       portfolioEntrySummary

      }
    }

  }
}
`


export const ProposalQuery = gql`
query Proposal($slug: String!)  {
  proposal: proposals  (where: {
    candidate: {
    slug: $slug
    }
  }){
    slug
    title
    subTitle
    candidate{
      slug
      name
    }
    sideText
    pageZone {
     ... on ComponentLayoutsTextBlock {
       richText
     }
     ... on ComponentLayoutsImageField {
      imageField{
        url
        }
        }
      }
  }
}
`


export const FeedQuery = gql`
query Feeds($slug: String!)  {

  feeds: feeds  (where: {
    candidate: {
    slug: $slug
    }
  },  sort: "published_at:DESC" ){
    slug
    title
    published_at
    candidate{
      slug
      name
    }
    pageZone {
      ... on ComponentLayoutsTextBlock {
        richText

      }
       ... on ComponentLayoutsImageField {
        imageField{
          url
        }

      }
      ... on ComponentLayoutsGallery {
        galleryImages{
          url
        }

      }
      ... on ComponentLayoutsVideo {
        videoUrl

      }
      ... on ComponentLayoutsAudio {
        displayText
        audioFile{
          alternativeText
          mime
          url
        }



      }
      ... on ComponentLayoutsDownload {
        downloadFile{
          alternativeText
          mime
          url
        }
        displayName

      }

    }

  }
}
`

export const OneFeedQuery = gql`
query Feed($slug: String!)  {

  feed: feeds  (where: {
    slug: $slug
  },  sort: "published_at:DESC" ){
    slug
    title
    published_at
    candidate{
      slug
      name
    }
    pageZone {
      ... on ComponentLayoutsTextBlock {
        richText

      }
       ... on ComponentLayoutsImageField {
        imageField{
          url
        }

      }
      ... on ComponentLayoutsGallery {
        galleryImages{
          url
        }

      }
      ... on ComponentLayoutsVideo {
        videoUrl
      }
      ... on ComponentLayoutsAudio {
        displayText
        audioFile{
          alternativeText
          mime
          url
        }



      }
      ... on ComponentLayoutsDownload {
        downloadFile{
          alternativeText
          mime
          url
        }
        displayName

      }

    }

  }
}
`
