export interface MenuItem {
  id: number;               
  label: string;            
  link?: string;            
  subItems?: MenuItem[];    
  isTitle?: boolean;    
}
