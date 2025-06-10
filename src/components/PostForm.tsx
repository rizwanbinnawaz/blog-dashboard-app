'use client'

import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import RichTextEditor from '@/components/RichTextEditor'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface FormValues {
  title: string
  body: string
}

interface PostFormProps {
  initialValues?: FormValues
  onSubmit: (values: FormValues) => void
  isEditing?: boolean
  isSubmitting?: boolean
}

export function PostForm({ initialValues, onSubmit, isEditing, isSubmitting }: PostFormProps) {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { title: '', body: '' },
  })

  const [editorContent, setEditorContent] = useState('')

  useEffect(() => {
    if (initialValues) {
      reset({ title: initialValues.title, body: initialValues.body })
      setEditorContent(initialValues.body)
    } else {
      reset({ title: '', body: '' })
      setEditorContent('')
    }
  }, [initialValues, reset])

  const handleFormSubmit = (data: FormValues) => {
    onSubmit({ ...data, body: editorContent })
    reset()
    setEditorContent('')
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <input
        {...register('title', { required: true })}
        placeholder="Post Title"
        className="w-full rounded-xl border px-3 py-2"
      />
      <RichTextEditor value={editorContent} onChange={setEditorContent} />
      {isSubmitting ? (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </Button>
      ) : (
        <Button type="submit">
          {isEditing ? 'Update Post' : 'Create Post'}
        </Button>
      )}
    </form>
  )