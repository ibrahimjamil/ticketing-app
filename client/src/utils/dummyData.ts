const links = [
    {
      link: '/',
      label: "Home"
    },
    {
      link: '/about',
      label: "About"
    },
    {
      link: '/contact',
      label: "Contact"
    },
    {
      link: '/fax',
      label: 'Fax'
    },
    {
      link: '/logout',
      label: "Logout"
    }
  ]

const sizes = {
  label: "Size",
  placeholder: "Select size",
  data:[
    'XS','X','L','XL'
  ]
}

const category = {
  label: "Category",
  placeholder: "Select category",
  data:[
    'good','best','exceptional'
  ]
}

const brand = {
  label: "Branch",
  placeholder: "Select brand",
  data: []
}

const fabric = {
  label: "Fabric",
  placeholder: "Select fabric",
  data: []
}

const gender = {
  label: "Gender",
  placeholder: "Select gender",
  data: []
}

const age = {
  label: "Age",
  placeholder: "Select age",
  data: []
}

const tableData={
  tableHead:[
    'Style', 'Description','Color','XS','S','M','L','XL','2XL','3XL','4XL','5XL'
  ],
  tableBodyData:[
    {
      Style: 'AL2300',
      Description: 'All made Unisex recycled Bend Tee',
      Color: 'Navy',
      XS: 112,
      S: 112,
      M: 112,
      L: 112,
      XL: 112,
      '2XL': 112,
      '3XL': 112,
      '4XL': 112,
      '5XL': 112,
    },
    {
      Style:'AL2300',
      Description: 'All made Unisex recycled Bend Tee',
      Color: 'Navy',
      XS: 112,
      S: 112,
      M: 112,
      L: 112,
      XL: 112,
      '2XL': 112,
      '3XL': 112,
      '4XL': 112,
      '5XL': 112
    },
    {
      Style:'AL2300',
      Description: 'All made Unisex recycled Bend Tee',
      Color: 'Navy',
      XS: 112,
      S: 112,
      M: 112,
      L: 112,
      XL: 112,
      '2XL': 112,
      '3XL': 112,
      '4XL': 112,
      '5XL': 112
    }
  ]
}


  export {
      links,
      sizes,
      category,
      brand,
      fabric,
      gender,
      age,
      tableData
  }