// 1.3: course information step3 & 1.4: course information step4

// const Header = (props) => {
//   return (
//     <h1>{props.course}</h1>
//   )
// }


// 1.3: course information step3 & 1.4: course information step4

// const Part = (props) => {
//   return (
//     <p>{props.part} {props.exercise}</p>
//   )
// }

// 1.3: course information step3
// const Content = (props) => {
//   return (
//     <div>
//       <Part part={props.part1['name']} exercise={props.part1['exercises']} />
//       <Part part={props.part2['name']} exercise={props.part2['exercises']} />
//       <Part part={props.part3['name']} exercise={props.part3['exercises']} />
//     </div>

//   )
// }

// 1.3: course information step3 & 1.4: course information step4
// const Total = (props) => {
//   return (
//     <p>Number of exercises {props.parts[0]['exercises'] + props.parts[1]['exercises'] + props.parts[2]['exercises']}</p>
//   )
// }


// 1.3: course information step3
// const App = () => {
//   const course = 'Half Stack application development'
//   const part1 = {
//     name: 'Fundamentals of React',
//     exercises: 10
//   }
//   const part2 = {
//     name: 'Using props to pass data',
//     exercises: 7
//   }
//   const part3 = {
//     name: 'State of a component',
//     exercises: 14
//   }

//   return (
//     <div>
//       <Header course={course} />
//       <Content part1={part1} part2={part2} part3={part3} />
//       <Total total={part1['exercises'] + part2['exercises'] + part3['exercises']}/>
//     </div>
//   )
// }


// 1.4: course information step3
// const Content = (props) => {
//   return (
//     <div>
//       <Part part={props.parts[0]['name']} exercise={props.parts[0]['exercises']} />
//       <Part part={props.parts[1]['name']} exercise={props.parts[1]['exercises']} />
//       <Part part={props.parts[2]['name']} exercise={props.parts[2]['exercises']} />
//     </div>

//   )
// }

// 1.5: course information step5
const Header = (props) => {
  return (
    <h1>{props.course['name']}</h1>
  )
}

// 1.5: course information step5
const Part = (props) => {
  return (
    <p>{props.course['name']} {props.course['exercises']}</p>
  )
}

 // 1.5: course information step5
const Content = (props) => {
  return (
    <div>
      <Part course={props.course['parts'][0]} />
      <Part course={props.course['parts'][1]} />
      <Part course={props.course['parts'][2]} />
    </div>

  )
}

// 1.5: course information step5
const Total = (props) => {
  return (
    <p>Number of exercises {props.course['parts'][0]['exercises'] + props.course['parts'][1]['exercises'] + props.course['parts'][2]['exercises']}</p>
  )
}



// 1.3: course information step3 & 1.4: course information step4 & 1.5: course information step5
const App = () => {

  // 1.3: course information step3 & 1.4: course information step4
  // const course = 'Half Stack application development'

  // 1.3: course information step3
  // const part1 = {
  //   name: 'Fundamentals of React',
  //   exercises: 10
  // }
  // const part2 = {
  //   name: 'Using props to pass data',
  //   exercises: 7
  // }
  // const part3 = {
  //   name: 'State of a component',
  //   exercises: 14
  // }

  // 1.4: course information step4
  // const parts = [
  //   {
  //     name: 'Fundamentals of React',
  //     exercises: 10
  //   },
  //   {
  //     name: 'Using props to pass data',
  //     exercises: 7
  //   },
  //   {
  //     name: 'State of a component',
  //     exercises: 14
  //   }
  // ]

  // 1.5: course information step5
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App