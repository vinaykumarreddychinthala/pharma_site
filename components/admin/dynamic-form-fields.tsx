'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2 } from 'lucide-react'

// --- String List (Array of Strings) ---
interface StringListProps {
  label: string
  name: string
  defaultValue?: string[]
}

export function StringListInput({ label, name, defaultValue = [] }: StringListProps) {
  const [items, setItems] = useState<string[]>(defaultValue.length ? defaultValue : [''])

  const addItem = () => setItems([...items, ''])
  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems.length ? newItems : [''])
  }
  const updateItem = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index] = value
    setItems(newItems)
  }

  return (
    <div className="space-y-3 p-4 bg-muted/20 border rounded-xl">
      <div className="flex justify-between items-center">
        <label className="text-sm font-bold text-foreground">{label}</label>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={addItem}
          className="h-7 px-2 text-[10px]"
        >
          <Plus className="w-3 h-3 mr-1" /> Add Item
        </Button>
      </div>
      
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <Input 
              value={item} 
              onChange={(e) => updateItem(i, e.target.value)}
              placeholder="Enter value..."
              className="text-xs"
            />
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={() => removeItem(i)}
              className="h-10 w-10 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
      
      {/* Hidden input to hold the actual JSON that gets submitted */}
      <input type="hidden" name={name} value={JSON.stringify(items.filter(i => i.trim() !== ''))} />
    </div>
  )
}

// --- Object List (Array of Objects) ---
interface ObjectListProps {
  label: string
  name: string
  fields: { key: string; label: string; type?: 'text' | 'textarea' }[]
  defaultValue?: any[]
}

export function ObjectListInput({ label, name, fields, defaultValue = [] }: ObjectListProps) {
  const [items, setItems] = useState<any[]>(defaultValue.length ? defaultValue : [{}])

  const addItem = () => setItems([...items, {}])
  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems.length ? newItems : [{}])
  }
  const updateItemField = (index: number, key: string, value: string) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [key]: value }
    setItems(newItems)
  }

  return (
    <div className="space-y-4 p-4 bg-muted/20 border rounded-xl">
      <div className="flex justify-between items-center">
        <label className="text-sm font-bold text-foreground">{label}</label>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={addItem}
          className="h-7 px-2 text-[10px]"
        >
          <Plus className="w-3 h-3 mr-1" /> Add Row
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="relative p-3 bg-background border rounded-lg space-y-3">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={() => removeItem(i)}
              className="absolute top-1 right-1 h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
            
            <div className="grid gap-3">
              {fields.map((field) => (
                <div key={field.key} className="space-y-1">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase">{field.label}</span>
                  {field.type === 'textarea' ? (
                    <Textarea 
                      value={item[field.key] || ''} 
                      onChange={(e) => updateItemField(i, field.key, e.target.value)}
                      className="text-xs min-h-[60px]"
                      placeholder={`Enter ${field.label}...`}
                    />
                  ) : (
                    <Input 
                      value={item[field.key] || ''} 
                      onChange={(e) => updateItemField(i, field.key, e.target.value)}
                      className="text-xs h-8"
                      placeholder={`Enter ${field.label}...`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <input type="hidden" name={name} value={JSON.stringify(items.filter(obj => Object.values(obj).some(v => !!v)))} />
    </div>
  )
}

// --- Single Object Input ---
interface SingleObjectProps {
  label: string
  name: string
  fields: { key: string; label: string }[]
  defaultValue?: any
}

export function SingleObjectInput({ label, name, fields, defaultValue = {} }: SingleObjectProps) {
  const [data, setData] = useState(defaultValue)

  const updateField = (key: string, value: string) => {
    setData({ ...data, [key]: value })
  }

  return (
    <div className="space-y-3 p-4 bg-muted/20 border rounded-xl">
      <label className="text-sm font-bold text-foreground">{label}</label>
      <div className="grid gap-3">
        {fields.map((field) => (
          <div key={field.key} className="space-y-1">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase">{field.label}</span>
            <Input 
              value={data[field.key] || ''} 
              onChange={(e) => updateField(field.key, e.target.value)}
              className="text-xs h-8"
              placeholder={`Enter ${field.label}...`}
            />
          </div>
        ))}
      </div>
      <input type="hidden" name={name} value={JSON.stringify(data)} />
    </div>
  )
}
