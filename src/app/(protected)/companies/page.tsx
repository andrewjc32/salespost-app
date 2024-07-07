import CompaniesTable from './CompaniesTable';

const CompaniesPage = () => {
  return (
    <div style={{paddingTop: '1rem', paddingBottom: '4rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
      <h1 className="text-[30px] font-semibold leading-[45px] text-left">Companies</h1>
      <div className="pt-2">
        <CompaniesTable />
      </div>
    </div>
  )
}

export default CompaniesPage