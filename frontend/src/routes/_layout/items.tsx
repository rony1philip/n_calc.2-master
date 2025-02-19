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
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import { z } from "zod"

import { PatientsService } from "../../client"
import ActionsMenu from "../../components/Common/ActionsMenu"
import Navbar from "../../components/Common/Navbar"
import AddPatient from "../../components/Patient/AddIPatient.tsx"
import { PaginationFooter } from "../../components/Common/PaginationFooter.tsx"

const patientsSearchSchema = z.object({
  page: z.number().catch(1),
})

export const Route = createFileRoute("/_layout/items")({
  component: Patient,
  validateSearch: (search) => patientsSearchSchema.parse(search),
})

const PER_PAGE = 5

function getPatientsQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      PatientsService.readPatients({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["patients", { page }],
  }
}

function PatientsTable() {
  const queryClient = useQueryClient()
  const { page } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const setPage = (page: number) =>
    navigate({ search: (prev) => ({ ...prev, page }) })

  const {
    data: patients,
    isPending,
    isPlaceholderData,
  } = useQuery({
    ...getPatientsQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const hasNextPage = !isPlaceholderData && patients?.data.length === PER_PAGE
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
              {patients?.data.map((patient) => (
                <Tr key={patient.id} opacity={isPlaceholderData ? 0.5 : 1}>
                  <Td>{patient.id}</Td>
                  <Td isTruncated maxWidth="150px">
                    {patient.title}
                  </Td>
                  <Td
                    color={!patient.description ? "ui.dim" : "inherit"}
                    isTruncated
                    maxWidth="150px"
                  >
                    {patient.description || "N/A"}
                  </Td>
                  <Td>
                    <ActionsMenu type={"Patient"} value={patient} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
      <PaginationFooter
        page={page}
        onChangePage={setPage}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
      />
    </>
  )
}

function Patient() {
  return (
    <Container maxW="full">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12}>
        Patients Management
      </Heading>

      <Navbar type={"Patient"} addModalAs={AddPatient} />
      <PatientsTable />
    </Container>
  )
}
