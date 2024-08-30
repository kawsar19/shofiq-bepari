new Vue({
   el: '#app',
   data: {
      name: 'kawsar ahmed',
      users: [],
      submissions: [
         {
            id: 1,
            title: 'Agricare',
            description: 'On-demand sand castle construction expertise.',
            url: '#',
            votes: 1,
            avatar: '/images/agricare.png',
            submissionImage: '../public/images/submissions/image-yellow.png',
      },
         {
            id: 2,
            title: 'kideny',
            description: 'On-demand sand castle construction expertise.',
            url: '#',
            votes: 10,
            avatar: '/images/kideny.jpg',
            submissionImage: '../public/images/submissions/image-yellow.png',
         }

      ],
      newUser: {
         name: '',
         address: '',
         gender: '',
         language: ''
      },
      divisions: [],
      districts: [],
      thanas:[],
      unions:[],
      selectedDivision: null,
      selectedDistrict:null,
      selectedThana:null,
      selectedUnion:null,
   },
   methods: {
      addUser() {
         if (!this.newUser.name || this.newUser.name.length < 3) {
            alert('Please write name');
            return
         }
         if (!this.newUser.address) {
            alert('please writeaddress');
            return;
         }
         const user = {
            ...this.newUser,
            id: this.users.length + 1
         }
         
         return
         this.users.push(user);
         this.updateLocalsorage()
         this.newUser = {
            name: '',
            address: ''
         }
      },
      delUser(id) {
         const confirm = window.confirm(' Are you sure want to delte the user? ');
         if (confirm) {
            let filtered = this.users.filter(user => user.id != id)
            this.users = filtered;
            this.updateLocalsorage();
         }


      },
      updateLocalsorage() {
         localStorage.setItem('users', JSON.stringify(this.users))
      },
      upvote(id) {
         const submission = this.submissions.find(submission => submission.id === id)
         submission.votes++
      },
      async getDivision() {
         try {
            const res = await fetch('/data/divisions.json');
            const data = await res.json();
            this.divisions = data[2].data
         } catch (e) {
            console.log(e)
         }
      },
      async getDistrict() {
         try {
            const res = await fetch('/data/districts.json');
            const data = await res.json();
            //console.log(data[2].data);
            this.districts = data[2].data

         } catch (e) {
            throw e
         }
      },
      async getThanas() {
         try {
            const res= await fetch('/data/upazilas.json');
            const data = await res.json();
           
            this.thanas =data[2].data;
         } catch (e) {
            throw e
         }
      },
      async getUnions(){
         try {
            const res= await fetch('/data/unions.json');
            const data = await res.json();
            
            this.unions= data[2].data
         } catch (e) {
            throw e
         }
      },
      changeDivision(){
         this.selectedDistrict=null
         this.selectedThana=null;
         this.selectedUnion=null
      },
      changeDistrict(){
         this.selectedThana = null;
         this.selectedUnion = null
      },
      changeThana(){
         this.selectedUnion=null
      },
      addAddress(){
         
         const address =[
            this.selectedDivision,
            this.selectedDistrict,
            this.selectedThana,
            this.selectedUnion
            
            ]
           localStorage.setItem('address',JSON.stringify(address))
         
      }
      
   },
   mounted() {
      this.getDivision();
      this.getDistrict();
      this.getThanas();
      this.getUnions();
      this.users = JSON.parse(localStorage.getItem('users')) || []
      let a=20
      let b=20
      
      console.log(a*b);
      
      let result = 2009;
      const func = (x = 262) => {
         result = x;
      }
      func(null);
   },
   computed: {
      sortedSubmissions() {
         return this.submissions.sort((a, b) => {
            return a.votes - b.votes
         });
      },
      getDivisionWiseDistrict(){
         if(!this.selectedDivision){
            return[]
         }
         const filteredDistricts=this.districts.filter(d=>d.division_id===this.selectedDivision.id);
         return filteredDistricts;
      },
      getCityWiseThana() {
         if(!this.selectedDistrict) {
            return []
         } 
         const filteredThanas=this.thanas.filter(d=>d.district_id===this.selectedDistrict.id);
         return filteredThanas
      },
      getThanaWiseUnion (){
         if(!this.selectedThana){
            return []
         } 
        const filteredUnion= this.unions.filter(union=>union.upazilla_id===this.selectedThana.id);
        return filteredUnion;
      },
      checkValidation(){
         return !this.selectedDivision ||  !this.selectedDistrict ||  !this.selectedThana ||  !this.selectedUnion
      }
      
      

   }
})