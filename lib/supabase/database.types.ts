export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      subscribers: {
        Row: {
          id: string
          email: string
          marketing_consent: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          marketing_consent?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          marketing_consent?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
