// @flow

export const workout = {
  name: 'preseason',
  exercises: [
    {
      name: 'Warmup',
      type: 'warmup',
      sections: [
        {
          name: 'Lunges Left',
          duration: 30,
        },
        {
          name: 'Lunges Right',
          duration: 5,
        },
        {
          name: 'Medicine  Ball Left Side',
          duration: 6,
        },
        {
          name: 'Medicine  Ball Right Side',
          duration: 7,
        }
      ]
    },
    {
      name: 'Bench press',
      type: 'weights',
      sets: [
        {
          weight: 50,
          reps: 10,
          rest: 10,
        },
        {
          weight: 55,
          reps: 10,
          rest: 10,
        },
        {
          weight: 60,
          reps: 10,
          rest: 10,
        }
      ]
    },
    {
      name: 'Shoulder press',
      type: 'weights',
      sets: [
        {
          weight: 30,
          reps: 10,
          rest: 10,
        },
        {
          weight: 32.5,
          reps: 10,
          rest: 10,
        },
        {
          weight: 35,
          reps: 10,
          rest: 10,
        }
      ]
    }

  ]


}