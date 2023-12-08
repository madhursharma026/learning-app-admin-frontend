import { gql } from '@apollo/client';

export const AllChapterDetails = gql`
query Query {
  chapters {
    id
    chapterName
    chapterDescription
    createdAt
  }
}
`

export const AddChapterDetails = gql`
mutation Mutation($addChaptersArgs: AddChaptersArgs!) {
  addChapters(addChaptersArgs: $addChaptersArgs) {
    id
    chapterName
    chapterDescription
    createdAt
  }
}
`

export const TeacherDetail = gql`
mutation Mutation($mobileNumber: String!) {
  teacherByMobileNumber(mobileNumber: $mobileNumber) {
    id
    firstName
    lastName
    mobileNumber
  }
}
`

export const AllClassesDetails = gql`
mutation Mutation {
  teachingClasses {
    id
    title
    description
    startsAt
    teacherId
    createdAt
    updatedAt
    teacher {
      id
      firstName
      lastName
      mobileNumber
    }
    usersJoined {
      id
      firstName
      lastName
      mobileNumber
      profileImage
    }
  }
}
`

export const AddClassAPI = gql`
mutation Mutation($createTeachingClassInput: CreateTeachingClassInput!) {
  createTeachingClass(createTeachingClassInput: $createTeachingClassInput) {
    id
  }
}
`;

export const TeacherLoginOTP = gql`
mutation TeacherLoginVerification($loginVerificationInput: LoginVerificationInput!) {
  teacherLoginVerification(loginVerificationInput: $loginVerificationInput) {
    jwtToken
    refreshToken
  }
}
`;

export const TeacherLogin = gql`
mutation Mutation($firstStepLoginInput: FirstStepLoginInput!) {
  firstStepTeacherLogin(firstStepLoginInput: $firstStepLoginInput) {
    id
  }
}
`;

export const AllQuestions = gql`
mutation Questions {
  questions {
    id
    mainHeading
    Title
    Description
    Question
    Option1
    Option2
    Option3
    Option4
    correctAns
    IsOptionInImageFormate
    IsQuestionInMCQsFormate
    IsQuestionInInputFormate
    IsQuestionInImageFormate
    IsQuestionInFillUpsFormate
    chapterId
  }
}
`;

export const AddQuestions = gql`
mutation Mutation($addQuestionArgs: AddQuestionArgs!) {
  addQuestion(addQuestionArgs: $addQuestionArgs) {
    id
    mainHeading
    Title
    Description
    Question
    Option1
    Option2
    Option3
    Option4
    correctAns
    IsOptionInImageFormate
    IsQuestionInMCQsFormate
    IsQuestionInInputFormate
    IsQuestionInImageFormate
    IsQuestionInFillUpsFormate
    chapterId
  }
}
`;