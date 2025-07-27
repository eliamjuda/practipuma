import { useUser } from "@/hooks/useUser"

export const useUserGreeting = () => {
  const { firstName, isLoading } = useUser()
  
  const getGreeting = () => {
    const hour = new Date().getHours()
    
    if (hour < 12) {
      return `Buenos días, ${firstName}`
    } else if (hour < 18) {
      return `Buenas tardes, ${firstName}`
    } else {
      return `Buenas noches, ${firstName}`
    }
  }
  
  return {
    greeting: isLoading ? 'Cargando...' : getGreeting(),
    isLoading
  }
}