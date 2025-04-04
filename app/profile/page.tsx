'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<string>('')
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const router = useRouter()
  
  // Campos de perfil
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [education, setEducation] = useState('None')
  const [gender, setGender] = useState('')
  const [yearsExperience, setYearsExperience] = useState('')
  const [skills, setSkills] = useState<{name: string, years: string}[]>([])
  const [newSkill, setNewSkill] = useState('')
  const [newSkillYears, setNewSkillYears] = useState('')
  const [company, setCompany] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [currentlyEmployed, setCurrentlyEmployed] = useState(false)
  const [salary, setSalary] = useState('')

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      router.push('/auth')
      return
    }

    const userData = JSON.parse(storedUser)
    setUser(userData)
    
    // Si el usuario tiene un nombre, dividirlo en nombre y apellido
    if (userData.name) {
      const nameParts = userData.name.split(' ')
      if (nameParts.length > 0) setFirstName(nameParts[0])
      if (nameParts.length > 1) setLastName(nameParts.slice(1).join(' '))
    }
    
    if (userData.email) setEmail(userData.email)
    
    // Si hay datos de perfil, cargarlos en el formulario
    if (userData.profile) {
      const profile = userData.profile
      
      // Datos personales
      if (profile.firstName) setFirstName(profile.firstName)
      if (profile.lastName) setLastName(profile.lastName)
      if (profile.phone) setPhone(profile.phone)
      if (profile.city) setCity(profile.city)
      if (profile.state) setState(profile.state)
      if (profile.zipCode) setZipCode(profile.zipCode)
      if (profile.education) setEducation(profile.education)
      if (profile.gender) setGender(profile.gender)
      if (profile.yearsExperience) setYearsExperience(profile.yearsExperience)
      
      // Habilidades
      if (profile.skills && Array.isArray(profile.skills)) {
        setSkills(profile.skills)
      }
      
      // Empleo
      if (profile.employment) {
        if (profile.employment.company) setCompany(profile.employment.company)
        if (profile.employment.jobTitle) setJobTitle(profile.employment.jobTitle)
        if (profile.employment.currentlyEmployed !== undefined) setCurrentlyEmployed(profile.employment.currentlyEmployed)
        if (profile.employment.salary) setSalary(profile.employment.salary)
      }
    } else {
      // Si no hay datos de perfil en localStorage, intentar cargarlos desde la API
      const fetchProfileData = async () => {
        try {
          const token = localStorage.getItem('token')
          if (!token) return
          
          const response = await fetch('/api/profile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          
          if (response.ok) {
            const data = await response.json()
            
            if (data.profile && data.profile.profile) {
              const profile = data.profile.profile
              
              // Actualizar los estados con los datos obtenidos
              if (profile.firstName) setFirstName(profile.firstName)
              if (profile.lastName) setLastName(profile.lastName)
              if (profile.phone) setPhone(profile.phone)
              if (profile.city) setCity(profile.city)
              if (profile.state) setState(profile.state)
              if (profile.zipCode) setZipCode(profile.zipCode)
              if (profile.education) setEducation(profile.education)
              if (profile.gender) setGender(profile.gender)
              if (profile.yearsExperience) setYearsExperience(profile.yearsExperience)
              
              if (profile.skills && Array.isArray(profile.skills)) {
                setSkills(profile.skills)
              }
              
              if (profile.employment) {
                if (profile.employment.company) setCompany(profile.employment.company)
                if (profile.employment.jobTitle) setJobTitle(profile.employment.jobTitle)
                if (profile.employment.currentlyEmployed !== undefined) setCurrentlyEmployed(profile.employment.currentlyEmployed)
                if (profile.employment.salary) setSalary(profile.employment.salary)
              }
              
              // Actualizar el usuario en localStorage con los datos del perfil
              const updatedUser = {
                ...userData,
                profile: profile
              }
              localStorage.setItem('user', JSON.stringify(updatedUser))
              setUser(updatedUser)
            }
          }
        } catch (error) {
          console.error('Error al cargar el perfil:', error)
        }
      }
      
      fetchProfileData()
    }
    
    setLoading(false)
  }, [router])

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowLogoutModal(true)
  }

  const confirmLogout = () => {
    // Eliminar datos de sesión
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // Redirigir a la página de autenticación
    router.push('/auth')
  }

  const cancelLogout = () => {
    setShowLogoutModal(false)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    
    if (!fileList || fileList.length === 0) {
      return
    }
    
    const selectedFile = fileList[0]
    
    // Validar que sea una imagen y no exceda 5MB
    if (!selectedFile.type.startsWith('image/')) {
      setUploadStatus('Solo se permiten imágenes')
      return
    }
    
    if (selectedFile.size > 5 * 1024 * 1024) {
      setUploadStatus('La imagen no debe exceder 5MB')
      return
    }
    
    setFile(selectedFile)
    
    // Crear una URL para previsualizar la imagen
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(selectedFile)
    
    setUploadStatus('')
  }

  const handleUpload = async () => {
    if (!file || !user) return
    
    setUploadStatus('Subiendo...')
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No hay sesión activa')
      }
      
      const response = await fetch('/api/upload-profile-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al subir la imagen')
      }
      
      // Actualizar usuario con la nueva imagen
      const updatedUser = {
        ...user,
        profileImage: data.imageUrl
      }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      setUploadStatus('Imagen subida exitosamente')
      
    } catch (error: any) {
      setUploadStatus(`Error: ${error.message}`)
    }
  }
  
  const addSkill = () => {
    if (newSkill && newSkillYears) {
      setSkills([...skills, { name: newSkill, years: newSkillYears }])
      setNewSkill('')
      setNewSkillYears('')
    }
  }
  
  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill.name !== skillToRemove))
  }
  
  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No hay sesión activa')
      }
      
      // Preparar datos del perfil para enviar a la API
      const profileData = {
        firstName,
        lastName,
        phone,
        city,
        state,
        zipCode,
        education,
        gender,
        yearsExperience,
        skills,
        company,
        jobTitle,
        currentlyEmployed,
        salary
      }
      
      // Enviar datos a la API
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al guardar el perfil')
      }
      
      // Actualizar usuario local con los nuevos datos del perfil
      const updatedUser = {
        ...user,
        profile: data.profile
      }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      
      alert('Perfil guardado correctamente')
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Modal de confirmación de cierre de sesión */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto shadow-xl transform transition-all">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">¿Estás seguro que deseas salir?</h3>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={cancelLogout}
                className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 transition-colors"
              >
                No
              </button>
              <button
                onClick={confirmLogout}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
              >
                Sí
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                <p className="text-gray-600">{user.name || 'User'}</p>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
              
              <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-teal-500 bg-teal-500 flex items-center justify-center text-white text-4xl font-bold">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="h-full w-full object-cover"
                  />
                ) : user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{user.name?.charAt(0).toUpperCase() || 'U'}</span>
                )}
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="text-indigo-600 mb-4">
                  <p className="text-sm">Make sure to upload your resume on respective platforms!</p>
                  <p>
                    For LinkedIn - <a href="#" className="text-blue-500 hover:underline">Click here</a>, 
                    For Indeed - <a href="#" className="text-blue-500 hover:underline">Click here</a>
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                    <input 
                      type="text" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                    <input 
                      type="text" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
                    <input 
                      type="text" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="City"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State*</label>
                    <input 
                      type="text" 
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="State"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code*</label>
                    <input 
                      type="text" 
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="ZIP Code"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Highest Level of Education*</label>
                    <select 
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="None">None</option>
                      <option value="High School">High School</option>
                      <option value="Associate">Associate Degree</option>
                      <option value="Bachelor">Bachelor's Degree</option>
                      <option value="Master">Master's Degree</option>
                      <option value="Doctorate">Doctorate</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender*</label>
                    <select 
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="">Select a option</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Experience (In years)*</label>
                    <input 
                      type="text" 
                      value={yearsExperience}
                      onChange={(e) => setYearsExperience(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Years of experience"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  {/* Current / Previous Experience */}
                  <div className="border border-gray-200 rounded-md p-4">
                    <h3 className="text-lg font-semibold text-center mb-4">Current / Previous Experience (Optional)</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input 
                          type="text" 
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Curr / Prev company name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job title</label>
                        <input 
                          type="text" 
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CTC</label>
                        <input 
                          type="text" 
                          value={salary}
                          onChange={(e) => setSalary(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="In Lakhs Per Annum"
                        />
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="currently-work" 
                          checked={currentlyEmployed}
                          onChange={(e) => setCurrentlyEmployed(e.target.checked)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="currently-work" className="ml-2 block text-sm text-gray-700">
                          Do you currently work here?
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Skills */}
                  <div className="border border-gray-200 rounded-md p-4">
                    <h3 className="text-lg font-semibold text-center mb-4">Enter Your Skills</h3>
                    
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <div className="flex-grow">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Enter skill name*</label>
                          <input 
                            type="text" 
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter skill name, ex - java"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Exp. in years*</label>
                          <input 
                            type="text" 
                            value={newSkillYears}
                            onChange={(e) => setNewSkillYears(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        
                        <div className="flex items-end">
                          <button 
                            onClick={addSkill}
                            className="bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 focus:outline-none"
                          >
                            Add +
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {skills.map((skill, index) => (
                          <div key={index} className="bg-gray-100 rounded-md px-3 py-1 flex items-center">
                            <span>{skill.name}-{skill.years}</span>
                            <button 
                              onClick={() => removeSkill(skill.name)}
                              className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        
                        {/* Example skill tags */}
                        {skills.length === 0 && (
                          <>
                            <div className="bg-gray-100 rounded-md px-3 py-1 flex items-center">
                              <span>Node.js-1</span>
                              <button className="ml-2 text-gray-500 hover:text-gray-700">×</button>
                            </div>
                            <div className="bg-gray-100 rounded-md px-3 py-1 flex items-center">
                              <span>react js developer-0</span>
                              <button className="ml-2 text-gray-500 hover:text-gray-700">×</button>
                            </div>
                            <div className="bg-gray-100 rounded-md px-3 py-1 flex items-center">
                              <span>java-0</span>
                              <button className="ml-2 text-gray-500 hover:text-gray-700">×</button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <button 
                    onClick={handleSaveProfile}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none"
                  >
                    Save Profile
                  </button>
                </div>
                
                {/* Image upload controls */}
                <div className="mt-8 text-center">
                  <h3 className="text-lg font-medium mb-2">Profile Image</h3>
                  
                  <div className="flex flex-col items-center">
                    <label 
                      htmlFor="profile-image" 
                      className="cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                      Select Image
                    </label>
                    <input 
                      id="profile-image" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                    
                    {file && (
                      <button
                        onClick={handleUpload}
                        className="mt-2 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
                      >
                        Upload Image
                      </button>
                    )}
                    
                    {uploadStatus && (
                      <p className={`mt-2 text-sm ${uploadStatus.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                        {uploadStatus}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 