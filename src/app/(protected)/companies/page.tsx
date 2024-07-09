import CompaniesTable from './CompaniesTable';

const CompaniesPage = () => {
  return (
    <div>
      <h1 className="text-[30px] font-semibold leading-[45px] text-left">Companies</h1>
      <div className="pt-2">
        <CompaniesTable />
      </div>
    </div>
  )
}

export default CompaniesPage