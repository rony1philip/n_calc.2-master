import {
    Container,
    Heading,
    SkeletonText,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
  } from "@chakra-ui/react"
  import { useQuery, useQueryClient } from "@tanstack/react-query"
  import { useEffect, useState } from "react"
  import { z } from "zod"
  
  import { PatientsService } from "../../client"
  import ActionsMenu from "../../components/Common/ActionsMenu"
  import Navbar from "../../components/Common/Navbar"
  import AddPatient from "../Patient/AddIPatient.tsx"
  import { PaginationFooter } from "../../components/Common/PaginationFooter.tsx"
  
  const patientsSearchSchema = z.object({
    page: z.number().catch(1),
  })
  
  const validSearch = {
    validateSearch: (search) => patientsSearchSchema.parse(search),
  }
  
  const PER_PAGE = 5
  
  function getPatientsQueryOptions({ page }) {
    return {
      queryFn: () => PatientsService.readPatients({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
      queryKey: ["patient", { page }],
    }
  }
  
  function PatientsTable({ page, setPage }) {
    const queryClient = useQueryClient()
  
    const {
      data: Patients,
      isPending,
      isPlaceholderData,
    } = useQuery({
      ...getPatientsQueryOptions({ page }),
      placeholderData: (prevData) => prevData,
    })
  
    const hasNextPage = !isPlaceholderData && Patients?.data.length === PER_PAGE
    const hasPreviousPage = page > 1
  
    useEffect(() => {
      if (hasNextPage) {
        queryClient.prefetchQuery(getPatientsQueryOptions({ page: page + 1 }))
      }
    }, [page, queryClient, hasNextPage])
  
    return (
      <>
        <TableContainer>
          <Table size={{ base: "sm", md: "md" }}>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            {isPending ? (
              <Tbody>
                <Tr>
                  {new Array(4).fill(null).map((_, index) => (
                    <Td key={index}>
                      <SkeletonText noOfLines={1} paddingBlock="16px" />
                    </Td>
                  ))}
                </Tr>
              </Tbody>
            ) : (
              <Tbody>
                {Patients?.data.map((patient) => (
                  <Tr key={patient.id} opacity={isPlaceholderData ? 0.5 : 1}>
                    <Td>{patient.first_name} {patient.last_name}</Td>
                    <Td isTruncated maxWidth="150px">{patient.phon_number}</Td>
                    <Td  isTruncated maxWidth="150px">
                      {patient.email || "N/A"}</Td>
                    <Td>
                      <ActionsMenu type={"Patient"} value={patient} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            )}
          </Table>
        </TableContainer>
        <PaginationFooter page={page} onChangePage={setPage} hasNextPage={hasNextPage} hasPreviousPage={hasPreviousPage} />
      </>
    )
  }
  
  function PatientsManagement() {
    const [page, setPage] = useState(1)
  
    return (
      <Container maxW="full">
        <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12}>
        Patients Management
        </Heading>
        <Navbar type={"Patient"} addModalAs={AddPatient} />
        <PatientsTable page={page} setPage={setPage} />
      </Container>
    )
  }
  
  export default PatientsManagement;
  