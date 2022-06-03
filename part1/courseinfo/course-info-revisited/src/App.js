import Course from './components/Course'

// const Part = ({ part }) => {
//   return (
//     <p>{part.name} {part.exercises}</p>
//   )

// }

// const Header = ({ course }) => <h2>{course.name}</h2>

// const Content = ({ course }) => {
//   return (
//     <li>
//       {course.parts.map(part => 
//         <Part part={part} />
//         // <p>{part.name} {part.exercises}</p>
//       )}
//     </li>
//   )
// }

// const Total = ({ course }) => {
//   const sumall = course.parts.map(part => part.exercises).reduce((prev, curr) => prev + curr, 0)
//   return (
//     <b>total of {sumall} exercises</b>
//   )
// }

// // const Course = ({ course }) => {
// //   return (
// //     <div>
// //       <Header course={course} />
// //       <Content course={course} />
// //       <Total course={course} />
// //     </div>
// //   )

// // }

// const Course = ({ courses }) => {
//   return (
//     <div>
//       <h1>Web development curriculum</h1>
    
//       {courses.map(course =>
//         <div>
//           <Header course={course} />
//           <Content course={course} />
//           <Total course={course} />
//         </div>
//       )}
   
//     </div>
//   )
// }

const App = ({ courses }) => {
  return (
    <Course courses={courses} />
  
  )

}

export default App