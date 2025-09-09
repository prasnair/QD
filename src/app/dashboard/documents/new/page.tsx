'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  FileText,
  ArrowLeft,
  Save,
  Eye,
  Upload,
  Calendar,
  User,
  AlertCircle,
} from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const documentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  document_number: z.string().min(1, 'Document number is required'),
  version: z.string().min(1, 'Version is required'),
  document_type: z.string().min(1, 'Document type is required'),
  content: z.string().optional(),
  effective_date: z.string().optional(),
  review_date: z.string().optional(),
})

type DocumentFormData = z.infer<typeof documentSchema>

export default function NewDocumentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [previewMode, setPreviewMode] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DocumentFormData>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      version: '1.0',
      document_type: 'SOP',
    },
  })

  const watchedContent = watch('content')

  const onSubmit = async (data: DocumentFormData) => {
    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real app, you would save to Supabase here
      console.log('Document data:', data)
      
      // Redirect to documents list
      router.push('/dashboard/documents')
    } catch (err) {
      setError('Failed to create document. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const documentTypes = [
    { value: 'SOP', label: 'Standard Operating Procedure' },
    { value: 'Policy', label: 'Policy' },
    { value: 'Template', label: 'Template' },
    { value: 'Form', label: 'Form' },
    { value: 'Manual', label: 'Manual' },
    { value: 'Work Instruction', label: 'Work Instruction' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/documents">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Document</h1>
          <p className="text-gray-600 mt-2">Create a new controlled document</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Document Information</span>
              </CardTitle>
              <CardDescription>
                Fill in the details for your new controlled document
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Document Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter document title"
                      {...register('title')}
                      className={errors.title ? 'border-error-500' : ''}
                    />
                    {errors.title && (
                      <p className="text-sm text-error-600">{errors.title.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="document_number">Document Number *</Label>
                    <Input
                      id="document_number"
                      placeholder="e.g., SOP-001"
                      {...register('document_number')}
                      className={errors.document_number ? 'border-error-500' : ''}
                    />
                    {errors.document_number && (
                      <p className="text-sm text-error-600">{errors.document_number.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="version">Version *</Label>
                    <Input
                      id="version"
                      placeholder="e.g., 1.0"
                      {...register('version')}
                      className={errors.version ? 'border-error-500' : ''}
                    />
                    {errors.version && (
                      <p className="text-sm text-error-600">{errors.version.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="document_type">Document Type *</Label>
                    <select
                      id="document_type"
                      {...register('document_type')}
                      className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      {documentTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.document_type && (
                      <p className="text-sm text-error-600">{errors.document_type.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="effective_date">Effective Date</Label>
                    <Input
                      id="effective_date"
                      type="date"
                      {...register('effective_date')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="review_date">Review Date</Label>
                    <Input
                      id="review_date"
                      type="date"
                      {...register('review_date')}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Document Content</Label>
                  <textarea
                    id="content"
                    rows={12}
                    placeholder="Enter the document content here..."
                    {...register('content')}
                    className="flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="gradient-primary shadow-colored hover-glow"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Create Document
                      </>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setPreviewMode(!previewMode)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {previewMode ? 'Edit' : 'Preview'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Preview/Help Panel */}
        <div className="space-y-6">
          {/* Preview */}
          {previewMode && (
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <h3>{watch('title') || 'Document Title'}</h3>
                  <p className="text-sm text-gray-600">
                    {watch('document_number') || 'DOC-001'} v{watch('version') || '1.0'}
                  </p>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    {watchedContent ? (
                      <div className="whitespace-pre-wrap">{watchedContent}</div>
                    ) : (
                      <p className="text-gray-500 italic">Document content will appear here...</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Help */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Document Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Document Numbering</h4>
                <p className="text-sm text-gray-600">
                  Use a consistent format like SOP-001, POL-001, etc.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Version Control</h4>
                <p className="text-sm text-gray-600">
                  Start with version 1.0 for new documents. Use semantic versioning for updates.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Review Dates</h4>
                <p className="text-sm text-gray-600">
                  Set review dates based on document criticality and regulatory requirements.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Attach File</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Drag and drop a file here, or click to browse
                </p>
                <Button variant="outline" size="sm">
                  Choose File
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
