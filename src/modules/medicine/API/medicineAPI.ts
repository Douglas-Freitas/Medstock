import baseAPI from '@/http'
import type Medicine from '../types/medicine'

const router = 'medicine'

class MedicineAPI {
  list(): Promise<Medicine> {
    return baseAPI.get(router)
  }

  save(medicine: Medicine): Promise<any> {
    return baseAPI.post(router, medicine)
  }

  delete(id: any): Promise<any> {
    return baseAPI.delete(`${router}/${id}`)
  }

  update(medicine: Medicine): Promise<any> {
    return baseAPI.put(`${router}/${medicine.id}`, medicine)
  }
  
  getById(id: any): Promise<Medicine> {
    return baseAPI.get(`${router}/${id}`);
  }
}

export default new MedicineAPI()
