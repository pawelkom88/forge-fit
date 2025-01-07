import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Exercise, Set } from '@/types/workout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ExerciseCardProps {
  exercise: Exercise
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const [sets, setSets] = useState<Set[]>(exercise.sets)

  const addSet = () => {
    setSets([...sets, { weight: 0, reps: 0 }])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{exercise.name || 'New Exercise'}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sets.map((set, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-20">
                <Input
                  type="number"
                  value={set.weight}
                  onChange={(e) => {
                    const newSets = [...sets]
                    newSets[index].weight = Number(e.target.value)
                    setSets(newSets)
                  }}
                  placeholder="Weight"
                />
              </div>
              <span>×</span>
              <div className="w-20">
                <Input
                  type="number"
                  value={set.reps}
                  onChange={(e) => {
                    const newSets = [...sets]
                    newSets[index].reps = Number(e.target.value)
                    setSets(newSets)
                  }}
                  placeholder="Reps"
                />
              </div>
              <span className="text-sm text-gray-500">Set {index + 1}</span>
            </div>
          ))}
          <Button
            onClick={addSet}
            variant="outline"
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Set
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

